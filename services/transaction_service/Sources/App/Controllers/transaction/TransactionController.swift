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

struct TransactionController: RouteCollection {

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


    func get(req: Request) async throws -> QueryResponse {
        guard let id = req.parameters.get("id") else {
            throw InvalidHashError.missingID
        }
        let query = try req.query.decode(TransactionQuery.self)
        let hexStringID = try HexString(id.lowercased())

        let result = try await req.transactionClient.findById(id: hexStringID, page: query.page, perPage: query.per) as? QueryResponse
        if let result = result {
            return result
        }

        throw Abort(.notFound)
    }
}
