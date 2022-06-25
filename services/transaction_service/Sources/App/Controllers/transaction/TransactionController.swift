import Fluent
import Vapor
import Alamofire
import Redis
import model
import common


struct TransactionQuery: Content {
    var page: Int?
    var per: Int?
}

struct TransactionController: RouteCollection, TransactionProtocol {

    func boot(routes: RoutesBuilder) throws {
        routes.get("stats", "transaction", ":id", use: self.get)
        routes.get("stats", "transaction", "health", use: self.getHealth)
    }

    /**
     Get transaction service's health condition
     */
    func health() async -> Health {
        return Health(status: .ok, total: 1, numHealthyServices: 1, isLeaf: true, services: [])
    }

    /**
     Get transaction, block, or user info by id
     */
    func findById(id: HexString, with database: DatabaseClient, page: Int?, perPage: Int?) async throws -> QueryResponseProtocol {
        let redisKey = RedisKey("\(id.stringValue!)?start=\(page ?? 0)&per=\(perPage ?? 0)")
        let cached = try await database.cacheClient.get(redisKey, asJSON: QueryResponse.self)
        if let cached = cached {
            database.logger.info("Found cache for key \(redisKey)")
            return cached
        }
        let result =  try await QueryResponse.fromData(
                id: id,
                transactionData: getTransaction(id: id, with: database),
                blockData: getBlock(id: id, with: database),
                userData: getUser(id: id, page: page, per: perPage, db: database)
        )
        // save cache
        if result.shouldCache {
            try? await database.cacheClient.set(redisKey, toJSON: result)
            let _ = database.cacheClient.expire(redisKey, after: .hours(1))
        }
        return result
    }
}
