//
// Created by Qiwei Li on 6/22/22.
//

import Foundation
import common
import Vapor
import Fluent

struct DatabaseClient: DatabaseProtocol {
    var logger: Logger
    var cacheClient: Request.Redis
    var databaseClient: Database
}
