//
// Created by Qiwei Li on 7/1/22.
//

import Fluent
import Vapor
import Alamofire
import model
import common
import Redis
import clients

typealias Request = Vapor.Request

struct UserStatistics {
    var totalSent: Int?
    var totalReceived: Int?
    var transactions: Page<TransactionModel>?
}


class TransactionClient: TransactionProtocol {
    typealias DBClient = DatabaseClient
    var database: DatabaseClient
    let request: Request

    init(request: Request) {
        database = DatabaseClient(logger: request.logger, cacheClient: request.redis, databaseClient: request.db)
        self.request = request
    }

    /**
     Find transaction by transaction id
     */
    private func getTransaction(id: HexString, with database: DatabaseClient) async -> Transaction? {
        let transaction = try? await TransactionModel.query(on: database.databaseClient).filter(\.$hash == id.stringValue!).first()
        if var transaction = transaction?.toTransaction() {
            // only get block if transaction is confirmed
            if let blockHash = transaction.blockHash {
                let block = await getBlock(id: blockHash, with: database)
                transaction.block = block
            }
            if let fromUser = try? await request.userInfoClient.userinfo(id: transaction.from) {
                transaction.fromUserInfo = fromUser
            }
            if let toUser = try? await request.userInfoClient.userinfo(id: transaction.to) {
                transaction.toUserInfo = toUser
            }
            return transaction
        }
        return nil
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
        let blockResult = try? await task.value
        if var block = blockResult?.result {
            if let minerInfo = try? await request.userInfoClient.userinfo(id: block.miner) {
                block.minerInfo = minerInfo
            }
            return block
        }
        return nil
    }

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
                totalSent: TransactionModel.query(on: db.databaseClient).filter(\.$from == id).count(),
                totalReceived: TransactionModel.query(on: db.databaseClient).filter(\.$to == id).count(),
                transactions: TransactionModel.query(on: db.databaseClient)
                        .group(.or) {
                            group in
                            group.filter(\.$from == id).filter(\.$to == id)
                        }
                        .sort(\.$id, .descending)
                        .paginate(PageRequest(page: page ?? 0, per: per ?? 20)
                        )
        )


        let userInfo = try? await request.userInfoClient.userinfo(id: id)
        if let statisticsResult = statisticsResult {
            let user = User(
                    balance: balance,
                    transactions: statisticsResult.transactions?.items ?? [],
                    totalTransactionsReceived: statisticsResult.totalReceived ?? 0,
                    totalTransactionsSent: statisticsResult.totalSent ?? 0,
                    recentTransactions: [],
                    totalTransactions: statisticsResult.transactions?.metadata.total ?? 0,
                    itemsPerPage: statisticsResult.transactions?.metadata.per ?? 0,
                    userInfo: userInfo
            )
            return user
        }
        return User(balance: balance, transactions: [], totalTransactionsReceived: 0, totalTransactionsSent: 0, recentTransactions: [], totalTransactions: 0, itemsPerPage: 0, userInfo: userInfo)
    }


    /**
     Get transaction, block, or user info by id
     */
    func findById(id: HexString, page: Int?, perPage: Int?) async throws -> QueryResponseProtocol {
        let redisKey = RedisKey("\(id.stringValue!)?start=\(page ?? 0)&per=\(perPage ?? 0)")
        let cached = try await database.cacheClient.get(redisKey, asJSON: QueryResponse.self)
        if let cached = cached {
            database.logger.info("Found cache for key \(redisKey)")
            return cached
        }
        let result = try await QueryResponse.fromData(
                id: id,
                transactionData: getTransaction(id: id, with: database),
                blockData: getBlock(id: id, with: database),
                userData: getUser(id: id, page: page, per: perPage, db: database)
        )
        // save cache
        if result.shouldCache {
            try? await database.cacheClient.set(redisKey, toJSON: result)
            let _ = database.cacheClient.expire(redisKey, after: .minutes(10))
        }
        return result
    }
}

extension Request {
    var transactionClient: TransactionClient {
        return TransactionClient(request: self)
    }
}