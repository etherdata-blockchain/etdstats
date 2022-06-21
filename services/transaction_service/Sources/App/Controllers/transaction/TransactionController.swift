import Fluent
import Vapor
import Alamofire
import model
import common


struct TransactionQuery: Content {
    var page: Int?
    var per: Int?
}

struct TransactionController: RouteCollection, TransactionProtocol {
    func boot(routes: RoutesBuilder) throws {
        routes.get(":id", use: self.get)
        routes.get("health", use: self.getHealth)
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
    func findById(id: HexString, with database: Database?, page: Int?, perPage: Int?) async throws -> QueryResponseProtocol {
        guard let database = database else {
            throw InvalidTypeError.invalidRequestType
        }

        return try await QueryResponse.fromData(
            transactionData: getTransaction(id: id),
            blockData: getBlock(id: id, with: database),
            userData: getUser(id: id, page: page, per: perPage, db: database)
        )
    }
    
    
}
