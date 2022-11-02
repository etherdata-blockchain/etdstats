import Foundation
import model
import Vapor
import Fluent

struct CreateEvent: AsyncMigration {
    func prepare(on database: Database) async throws {
        try await database.schema(Event.schema).id().unique(on: "blockHash").create()
    }

    func revert(on database: Database) async throws {
        // Undo the change made in `prepare`, if possible.
    }
}
