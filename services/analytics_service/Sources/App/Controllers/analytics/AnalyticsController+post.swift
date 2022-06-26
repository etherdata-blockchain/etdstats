//
// Created by Qiwei Li on 6/26/22.
//

import Foundation
import Vapor
import model
import FluentMongoDriver
import Fluent

extension Request {
    // check if request is from mobile
    func isMobile() -> Bool {
        return self.headers.first(name: "User-Agent")?.contains("Mobile") ?? false
    }
}

extension AnalyticsController {
    /**
     Will increment the number of times the user has visited the site.
     - Parameter req:
     - Returns:
     - Throws:
     */
    func increment(req: Request) async throws -> Analytics {
        guard let db = req.db as? MongoDatabaseRepresentable else {
            throw Abort(.internalServerError)
        }
        let collection = db.raw[Analytics.schema]
        let query: Document = ["desktop": ["$exists": true]]
        let update: Document = ["$inc": [
            "total": 1,
            "mobile": req.isMobile() ? 1 : 0,
            "desktop": req.isMobile() ? 0 : 1,
         ]
        ]

        let updateResult = try! collection.updateMany(where: query, to: update).wait()
        print(updateResult)
        if let result = try await Analytics.query(on: req.db).first() {
            return result
        } else {
            throw Abort(.internalServerError)
        }
    }

    func post(_ req: Request) async throws -> Analytics {
        return try await increment(req: req)
    }
}