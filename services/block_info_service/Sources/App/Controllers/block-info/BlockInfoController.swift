import Fluent
import Vapor
import common

struct BlockInfoController: RouteCollection, HealthProtocol {
    func health() async -> Health {
        return Health(status: .ok, total: 1, numHealthyServices: 1, isLeaf: true, services: [])
    }

    func boot(routes: RoutesBuilder) throws {
        routes.get("stats", "block_info", use: self.get)
        routes.get("stats", "block_info", "health", use: self.health)
    }
}
