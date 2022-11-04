import Fluent
import Vapor
import model
import common

struct EventController: RouteCollection {
   
    func boot(routes: RoutesBuilder) throws {
        routes.get("stats", "contract", "event", use: self.getEvents)
        routes.get("stats", "contract", "event", ":contract_address", use: self.getEventsByContract)
        routes.post("stats", "contract", "event", ":contract_address", use: self.createMultipleEvents)
    }

}
