//
// Created by Qiwei Li on 6/30/22.
//

import Foundation
import Alamofire
import model
import common
import Vapor

typealias Request = Vapor.Request

/**
 User Microservice client
 */
public class UserClient: UserInfoProtocol {
    public typealias UserInfo = UserInfoModel

    public func userinfo(id: HexString) async throws -> UserInfoModel? {
        guard let baseURL = Environment.get(ENVIRONMENT_USER_SERVICE_URL_KEY) else {
            throw Abort(.internalServerError, reason: "User service url is not set")
        }
        guard var url = URL(string: baseURL) else {
            throw Abort(.internalServerError, reason: "Invalid user service url")
        }
        guard let stringID = id.stringValue else {
            throw Abort(.internalServerError, reason: "Invalid user id")
        }
        url = url.appendingPathComponent(stringID)
        let task = AF.request(url, method: .get).serializingDecodable(UserInfoModel.self)
        let value = try await task.value
        return value

        return nil
    }
}

public extension Request {
    var userInfoClient: UserClient {
        return UserClient()
    }
}
