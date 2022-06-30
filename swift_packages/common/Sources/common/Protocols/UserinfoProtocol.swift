//
// Created by Qiwei Li on 6/30/22.
//

import Foundation
import Vapor

public protocol UserInfoProtocol {
    associatedtype UserInfo: Content

    /**
      Get user info by user id
     - Parameter id: User wallet address
     - Returns: User Info
     */
    func userinfo(id: HexString) async throws -> UserInfo?
}
