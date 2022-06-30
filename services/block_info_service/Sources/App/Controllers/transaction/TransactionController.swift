import Fluent
import Vapor
import common
import model


struct TransactionController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        routes.get("stats", "block_info", "transactions", use: get)
    }

    func get(req: Request) async throws -> Page<TransactionModel> {
        let result = try await TransactionModel.query(on: req.db)
                .sort(\.$timestamp, .descending)
                .paginate(for: req)
        return result
    }
}
