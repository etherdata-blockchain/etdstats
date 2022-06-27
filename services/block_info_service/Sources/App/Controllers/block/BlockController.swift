import Fluent
import Vapor
import common
import model


struct BlockController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        routes.get("stats", "block_info", "blocks", use: get)
    }

    func get(req: Request) async throws -> Page<BlockModel> {
        let result = try await BlockModel.query(on: req.db)
                .sort(\.$numberInBase10, .descending)
                .paginate(for: req)
        return result
    }
}
