//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

enum DataType: String, Codable {
    case transaction = "transaction"
    case block = "block"
    case user = "user"
}

struct QueryResponse{
    var type: DataType
    var data: Any
}
