//
// Created by Qiwei Li on 6/24/22.
//

import Foundation

public struct AnyCodable: Codable {
    let value: Any

    public init(_ value: Any) {
        self.value = value
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()

        if let value = try? container.decode(Int.self) {
            self.value = value
            return
        }

        if let value = try? container.decode(Double.self) {
            self.value = value
            return
        }

        if let value = try? container.decode(String.self) {
            self.value = value
            return
        }

        if let value = try? container.decode(Bool.self) {
            self.value = value
            return
        }

        if let value = try? container.decode(HexString.self) {
            self.value = value
            return
        }

        throw DecodingError.dataCorruptedError(in: container, debugDescription: "Invalid type")
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()

        if let value = value as? Int {
            try container.encode(value)
            return
        }

        if let value = value as? Double {
            try container.encode(value)
            return
        }

        if let value = value as? String {
            try container.encode(value)
            return
        }

        if let value = value as? Bool {
            try container.encode(value)
            return
        }

        if let value = value as? HexString {
            try container.encode(value)
            return
        }

        throw EncodingError.invalidValue(value, EncodingError.Context(codingPath: [], debugDescription: "Invalid type"))
    }
}
