//
// Created by Qiwei Li on 6/24/22.
//

import Foundation

extension Date {
    // from hexadecimal string to Date
    public init?(fromHexString: String) {
        // convert int from hexadecimal string
        guard let int = Int(fromHexString.slice(start: 2), radix: 16) else {
            return nil
        }
        self = Date(timeIntervalSince1970: Double(int))
    }
}

public struct AnyDate: Codable {
    public var date: Date

    public init(_ date: Date) {
        self.date = date
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let stringDate = try? container.decode(String.self) {
            if !stringDate.starts(with: "0x") {
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
                if let date = dateFormatter.date(from: stringDate) {
                    self.date = date
                    return
                }
            
                if let doubleDate = Double(stringDate) {
                    date = Date(timeIntervalSince1970: doubleDate)
                    return
                }
                
                throw DecodingError.dataCorruptedError(in: container, debugDescription: "Invalid date string: \(stringDate)")

            } else {
                if let date = Date(fromHexString: stringDate) {
                    self.date = date
                    return
                }
                
                throw DecodingError.dataCorruptedError(in: container, debugDescription: "Invalid date string: \(stringDate)")
            }

        }
        
        if let intDate = try? container.decode(Int.self) {
            date = Date(timeIntervalSince1970: Double(intDate))
            return
        }
        throw DecodingError.dataCorruptedError(in: container, debugDescription: "Invalid type")
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        let stringValue = dateFormatter.string(from: date)
        try container.encode(stringValue)
    }
}
