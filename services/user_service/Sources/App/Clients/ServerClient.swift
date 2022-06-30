//
// Created by Qiwei Li on 6/30/22.
//

import Foundation
import common
import model
import Fluent
import Redis
import Vapor


struct DatabaseClient: DatabaseProtocol {
    var database: Database
    var cache: Request.Redis
}

class ServerClient: UserInfoProtocol {
    typealias UserInfo = UserInfoModel
    var db: DatabaseClient

    init(db: DatabaseClient) {
        self.db = db
    }

    func userinfo(id: HexString) async throws -> UserInfoModel? {
        let user = try await UserInfoModel.query(on: db.database).filter(\.$address == id).first()
        return user
    }
}
