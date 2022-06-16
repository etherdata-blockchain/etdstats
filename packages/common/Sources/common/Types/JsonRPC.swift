//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

// MARK: - JSONRPCResponse
struct JSONRPCResponse<T: Codable>: Content {
    let jsonrpc: String
    let result: T
}
