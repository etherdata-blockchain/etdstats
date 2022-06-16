//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

public enum InvalidTypeError {
    case invalidRequestType
}

extension InvalidTypeError: AbortError {
    public var reason: String {
        switch self {
        case .invalidRequestType: return "Request Type is not valid"
        }
    }
    
    public var status: HTTPResponseStatus {
        switch self {
        case .invalidRequestType: return .badRequest
        }
    }
}
