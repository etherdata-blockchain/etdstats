//
// Created by Qiwei Li on 6/21/22.
//

import Foundation
import Vapor

public enum HealthStatus: String, Codable {
    case ok = "ok";
    case warning = "warning";
    case error = "error";
}

public struct Health: Content {
    public var status: HealthStatus
    public var total: Int
    public var numHealthyServices: Int
    public var isLeaf: Bool
    public var services: [Health]

    public init(status: HealthStatus, total: Int, numHealthyServices: Int, isLeaf: Bool, services: [Health]) {
        self.status = status
        self.total = total
        self.numHealthyServices = numHealthyServices
        self.isLeaf = isLeaf
        self.services = services
    }
}
