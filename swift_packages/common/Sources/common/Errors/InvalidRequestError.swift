//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor


public enum InvalidHashError {
    case hashNotFound(id: HexString)
    case invalidFormat
    case missingID
}

extension InvalidHashError: AbortError {
    public var reason: String {
        switch self {
        case .invalidFormat: return "Invalid hash format"
        case .hashNotFound(let id): return "Neither a block, transaction, nor user with id \(id.stringValue ?? "") found"
        case .missingID: return "Missing ID in parameters"
        }
    }
    
    public var status: HTTPResponseStatus {
        switch self {
        case .hashNotFound:
            return .notFound
        case .invalidFormat:
            return .badRequest
        case .missingID:
            return .badRequest
        }
    }
}
