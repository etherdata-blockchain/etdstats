//
// Created by Qiwei Li on 6/21/22.
//

import Foundation

public protocol HealthProtocol {
    func health() async -> Health
}