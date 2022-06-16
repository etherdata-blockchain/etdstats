//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor


public enum InvalidHashError {
    case hashNotFound
    case invalidFormat
    case missingID
}

extension InvalidHashError: AbortError {
    public var reason: String {
        switch self {
        case .invalidFormat: return "Invalid hash format"
        case .hashNotFound: return "Neither a block, transaction, nor user with this id found"
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
