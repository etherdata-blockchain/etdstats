//
//  File.swift
//  
//
//  Created by Qiwei Li on 6/21/22.
//

import Fluent
import Vapor
import Alamofire
import model
import common

typealias Request = Vapor.Request

extension TransactionController {
    /**
     Get user data by user
     */
    func getUser(id: HexString, page: Int?, per: Int?, db: Database) async -> User?{
        let task = AF.request(Environment.get(ENVIRONMENT_RPC_URL_KEY)!,
                              method: .post,
                              parameters: BalanceRequest(params: [id.stringValue ?? "", "latest"]),
                              encoder: JSONParameterEncoder()
        ).serializingDecodable(JSONRPCResponse<String>.self)
        let value = try? await task.value
        guard let balance = value?.result else {
            return nil
        }
        
    
        let result = try! await Transaction.query(on: db)
            .group(.or){
                group in
                group.filter(\.$from == id).filter(\.$to == id)
            }
            .paginate(PageRequest(page: page ?? 0, per: per ?? 20))

        let user = User(balance: balance, transaction: result.items)
        return user
    }
    
    /**
     Get Block by block id
     */
    func getBlock(id: HexString, with db: Database) async -> Block?{
        let result = try? await Block.query(on: db)
            .filter(\.$hash == id)
            .first()
        return result
    }
    
    /**
     Find transaction by transaction id
     */
    func getTransaction(id: HexString) async -> Transaction?{
        let task = AF.request(Environment.get("RPC_URL")!,
                              method: .post,
                              parameters: TransactionRequest(params: [id]),
                              encoder: JSONParameterEncoder()
        ).serializingDecodable(JSONRPCResponse<Transaction>.self)
        let value = try? await task.value
        return value?.result
    }
    
    func get(req: Request) async throws -> QueryResponse{
        guard let id =  req.parameters.get("id") else {
            throw InvalidHashError.missingID
        }
        let query = try req.query.decode(TransactionQuery.self)
        
        
        let hexStringID = try HexString(id)
        
        return try await findById(id: hexStringID, with: req.db, page: query.page, perPage: query.per) as! QueryResponse
    }

}