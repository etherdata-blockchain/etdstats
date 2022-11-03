import Fluent
import Vapor
import model
import common

struct ContractController: RouteCollection, HealthProtocol {
    func health() async -> Health {
        return Health(status: .ok, total: 1, numHealthyServices: 1, isLeaf: true, services: [])
    }

    func boot(routes: RoutesBuilder) throws {
        routes.on(.PATCH, "stats", "contract", "contract", ":contract_address", body: .collect(maxSize: "20mb"), use: self.updateContract)
        routes.get("stats", "contract", "contract", use: self.listContracts)
        routes.get("stats", "contract", "health", use: self.health)
        routes.get("stats", "contract", "contract", ":contract_address", use: self.getContractByAddress)
        routes.get("stats", "contract", "contract", "search", use: self.search)
    }

}
