import Foundation
import model
import Vapor
import Fluent

struct CreateContract: AsyncMigration {
    func prepare(on database: Database) async throws {
        try await database.schema(Contract.schema).id().unique(on: "address").create()
    }

    func revert(on database: Database) async throws {
        // Undo the change made in `prepare`, if possible.
    }
}
