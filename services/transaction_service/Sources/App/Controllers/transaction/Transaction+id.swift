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
import Redis

typealias Request = Vapor.Request

struct UserStatistics {
    var totalSent: Int?
    var totalReceived: Int?
    var transactions: Page<Transaction>?
}

extension TransactionController {
    /**
     Get user data by user
     */
    func getUser(id: HexString, page: Int?, per: Int?, db: DatabaseClient) async -> User? {
        let task = AF.request(Environment.get(ENVIRONMENT_RPC_URL_KEY)!,
                method: .post,
                parameters: BalanceRequest(params: [id.stringValue ?? "", "latest"]),
                encoder: JSONParameterEncoder()
        ).serializingDecodable(JSONRPCResponse<String>.self)
        let value = try? await task.value
        guard let balance = value?.result else {
            return nil
        }

        let statisticsResult = try? await UserStatistics(
                totalSent: Transaction.query(on: db.databaseClient).filter(\.$from == id).count(),
                totalReceived: Transaction.query(on: db.databaseClient).filter(\.$to == id).count(),
                transactions: Transaction.query(on: db.databaseClient)
                        .group(.or) {
                            group in
                            group.filter(\.$from == id).filter(\.$to == id)
                        }
                        .sort(\.$id, .descending)
                        .paginate(PageRequest(page: page ?? 0, per: per ?? 20)
                        )
        )

        if let statisticsResult = statisticsResult {
            let user = User(
                    balance: balance,
                    transactions: statisticsResult.transactions?.items ?? [],
                    totalTransactionsReceived: statisticsResult.totalReceived ?? 0,
                    totalTransactionsSent: statisticsResult.totalSent ?? 0,
                    recentTransactions: [],
                    totalTransactions: statisticsResult.transactions?.metadata.total ?? 0,
                    itemsPerPage: statisticsResult.transactions?.metadata.per ?? 0
            )
            return user
        }
        return User(balance: balance, transactions: [], totalTransactionsReceived: 0, totalTransactionsSent: 0, recentTransactions: [], totalTransactions: 0, itemsPerPage: 0)
    }

    /**
     Get Block by block id
     */
    func getBlock(id: HexString, with db: DatabaseClient) async -> Block? {
        let task = AF.request(Environment.get("RPC_URL")!,
                method: .post,
                parameters: BlockRequest(params: [AnyCodable(id), AnyCodable(true)]),
                encoder: JSONParameterEncoder()
        ).serializingDecodable(JSONRPCResponse<Block>.self)
        let result = try? await task.value
        return result?.result
    }

    /**
     Find transaction by transaction id
     */
    func getTransaction(id: HexString, with database: DatabaseClient) async -> Transaction? {
        let transaction = try? await Transaction.query(on: database.databaseClient).filter(\.$hash == id.stringValue!).first()
        if let transaction = transaction {
            // only get block if transaction is confirmed
            if let blockHash = transaction.blockHash {
                let block = await getBlock(id: blockHash, with: database)
                transaction.block = block
            }
            return transaction
        }
        return nil
    }

    func get(req: Request) async throws -> QueryResponse {
        guard let id = req.parameters.get("id") else {
            throw InvalidHashError.missingID
        }
        let query = try req.query.decode(TransactionQuery.self)


        let hexStringID = try HexString(id)
        let dbClient = DatabaseClient(logger: req.logger, cacheClient: req.redis, databaseClient: req.db)

        let result = try await findById(id: hexStringID, with: dbClient, page: query.page, perPage: query.per) as? QueryResponse
        if let result = result {
            return result
        }

        throw Abort(.notFound)
    }

}
