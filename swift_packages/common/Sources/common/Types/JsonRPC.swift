//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

// MARK: - JSONRPCResponse

public struct JSONRPCResponse<T: Codable>: Content {
    public let jsonrpc: String
    public let result: T
}
