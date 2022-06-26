import Fluent
import Vapor
import model
import common

struct AnalyticsController: RouteCollection, HealthProtocol {
    func health() async -> Health {
        return Health(status: .ok, total: 1, numHealthyServices: 1, isLeaf: true, services: [])
    }

    func boot(routes: RoutesBuilder) throws {
        routes.post("stats", "analytics", use: self.post)
        routes.get("stats", "analytics", "health", use: self.get)
    }




}