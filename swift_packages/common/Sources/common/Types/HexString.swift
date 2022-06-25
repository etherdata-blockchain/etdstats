//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation

public struct HexString: Codable, Equatable {
    private var _value: Any
    public var stringValue: String? {
        if let value = _value as? String {
            return value
        }

        if let value = _value as? Int {
            return "0x" + String(value, radix: 16)
        }

        return nil
    }

    public var intValue: Int? {
        if let value = _value as? String {
            let value = value.slice(start: 2)
            guard let value = Int(value, radix: 16) else {
                return 0
            }

            return value
        }

        if let value = _value as? Int {
            return value
        }

        if let value = _value as? Double {
            return Int(value)
        }

        return nil
    }

    public init(_ value: String) throws {
        try HexString.checkValidString(value: value)
        _value = value
    }

    public init(_ value: Int) {
        _value = value
    }

    public init(_ value: Double) {
        _value = value
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        if let value = _value as? String {
            try container.encode(value)
            return
        }

        if let value = _value as? Int {
            try container.encode(value)
            return
        }

        if let value = _value as? Double {
            try container.encode(value)
            return
        }
        throw HexStringError.invalidType(receivedType: String(describing: type(of: _value)))
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let value = try? container.decode(Int.self) {
            _value = value
            return
        }

        if let value = try? container.decode(String.self) {
            try HexString.checkValidString(value: value)
            _value = value
            return
        }

        if let value = try? container.decode(Double.self) {
            _value = value
            return
        }

        self._value = "0x"
    }

    public static func == (lhs: HexString, rhs: HexString) -> Bool {
        if lhs.stringValue == rhs.stringValue || lhs.intValue == rhs.intValue {
            return true
        }
        return false
    }

    private static func checkValidString(value: String) throws {
        if !value.starts(with: "0x") {
            throw HexStringError.invalidType(receivedType: "String")
        }

        if !value.isHexNumber {
            throw HexStringError.invalidType(receivedType: "String")
        }
    }
}
