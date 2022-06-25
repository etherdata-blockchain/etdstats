//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation


public enum HexStringError: Error {
    case invalidType(receivedType: String)

    public var reason: String {
        switch self {
        case .invalidType(let receivedType): return "HexString is not valid got type \(receivedType)"
        }
    }
}
