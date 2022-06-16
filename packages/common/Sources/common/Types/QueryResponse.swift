//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

public enum DataType: String, Codable {
    case transaction = "transaction"
    case block = "block"
    case user = "user"
}

public struct QueryResponse{
    var type: DataType
    var data: Any
}
