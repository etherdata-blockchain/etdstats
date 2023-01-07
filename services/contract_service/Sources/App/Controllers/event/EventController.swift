import Fluent
import Vapor
import model
import common

struct EventController: RouteCollection {
   
    func boot(routes: RoutesBuilder) throws {
        routes.get("stats", "contract", "event", use: self.getEvents)
        routes.get("stats", "contract", "event", ":contract_address", use: self.getEventsByContract)
        routes.on(.POST, "stats", "contract", "event", ":contract_address", body: .collect(maxSize: "100mb"), use: self.createMultipleEvents)
    }

}
