//
// Created by Qiwei Li on 6/26/22.
//

import Foundation
import model
import Vapor
import Fluent

struct CreateAnalytics: AsyncMigration {
    func prepare(on database: Database) async throws {
        try await Analytics.initialize(database: database)
    }

    func revert(on database: Database) async throws {
        // Undo the change made in `prepare`, if possible.
    }
}