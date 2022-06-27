//
// Created by Qiwei Li on 6/27/22.
//

import Foundation
import Vapor

public struct PaginationRequest: Content {
    public var page: Int?
    public var per: Int?
}
