//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

enum InvalidTypeError {
    case invalidRequestType
}

extension InvalidTypeError: AbortError {
    var reason: String {
        switch self {
        case .invalidRequestType: return "Request Type is not valid"
        }
    }
    
    var status: HTTPResponseStatus {
        switch self {
        case .invalidRequestType: return .badRequest
        }
    }
}
