//
// Created by Qiwei Li on 6/30/22.
//

import Foundation
import Alamofire
import model
import common
import Vapor

public class Client: UserInfoProtocol {
    public typealias UserInfo = UserInfoModel

    public func userinfo(id: HexString) async throws -> UserInfoModel? {
        guard let baseURL = Environment.get(ENVIRONMENT_USER_SERVICE_URL_KEY) else {
            throw Abort(.internalServerError, reason: "User service url is not set")
        }
        guard let url = URL(string: baseURL) else {
            throw Abort(.internalServerError, reason: "Invalid user service url")
        }
        guard let stringID = id.stringValue else {
            throw Abort(.internalServerError, reason: "Invalid user id")
        }
        let _ = url.appendingPathComponent(stringID)
        let task = AF.request(url, method: .get).serializingDecodable(UserInfoModel.self)
        let value = try await task.value
        return value
    }
}