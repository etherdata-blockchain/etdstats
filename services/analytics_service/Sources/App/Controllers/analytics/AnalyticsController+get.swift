//
// Created by Qiwei Li on 6/26/22.
//

import Foundation
import Vapor
import common

extension AnalyticsController {
    func get(req: Request) async throws -> Health {
        return await self.health()
    }

}