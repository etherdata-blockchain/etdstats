import Fluent
import Vapor
import Alamofire
//import web3

typealias Request = Vapor.Request

struct TransactionController: RouteCollection, TransactionProtocol {
    func boot(routes: RoutesBuilder) throws {
        routes.get(":id", use: self.get)
    }
    
    /**
     Find transaction by transacrtion id
     */
    private func getTransaction(id: HexString) async -> Transaction?{
        let task = AF.request(Environment.get("RPC_URL")!,
                              method: .post,
                              parameters: TransactionRequest(params: [id]),
                              encoder: JSONParameterEncoder()
        ).serializingDecodable(JSONRPCResponse<Transaction>.self)
        let value = try? await task.value
        return value?.result
    }
    
    
    /**
     Get user data by user
     */
    private func getUser(id: HexString, start: Int?, end: Int?, db: Database) async -> User?{
        let task = AF.request(Environment.get("RPC_URL")!,
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
            .all()
        
        let user = User(balance: balance, transaction: result)
        return user
    }
    
    /**
     Get Block by block id
     */
    private func getBlock(id: HexString, with db: Database) async -> Block?{
        let result = try? await Block.query(on: db)
            .filter(\.$hash == id)
            .first()
        return result
    }
    
    
    /**
     Get transaction, block, or user info by id
     */
    func findById(id: HexString, with db: Database) async throws -> QueryResponse {
        return try await QueryResponse.fromData(
            transactionData: getTransaction(id: id),
            blockData: getBlock(id: id, with: db),
            userData: getUser(id: id, start: 0, end: 20, db: db)
        )
    }

    func get(req: Request) async throws -> QueryResponse{
        guard let id =  req.parameters.get("id") else {
            throw InvalidHashError.missingID
        }
        
        let hexStringID = try HexString(id)
        
        return try await findById(id: hexStringID, with: req.db)
    }
}
