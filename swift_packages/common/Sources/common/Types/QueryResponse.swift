//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

public enum DataType: String, Codable {
    case transaction
    case block
    case user
}

public protocol QueryResponseProtocol {
    var type: DataType { get set }
    var data: Any { get set }
}
