//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation

struct HexString: Codable, Equatable {
    private var _value: Any
    var stringValue: String? {
        get {
            if let value = self._value as? String {
                return value
            }
            
            if let value = self._value as? Int {
                return "0x" + String(value, radix: 16)
            }
            
            return nil
        }
    }
    
    var intValue: Int? {
        get {
            if let value = self._value as? String {
                let value = value.slice(start: 2)
                guard let value =  Int(value, radix: 16) else {
                    return 0
                }
                
                return value
            }
            
            if let value = self._value as? Int {
                return value
            }
            
            if let value = self._value as? Double {
                return Int(value)
            }
            
            return nil
        }
    }
    
    init(_ value: String) throws{
        try HexString.checkValidString(value: value)
        self._value = value
    }
    
    init(_ value: Int){
        self._value = value
    }
    
    init(_ value: Double) {
        self._value = value
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        if let value = self._value as? String {
            try container.encode(value)
            return
        }
        
        if let value = self._value as? Int {
            try container.encode(value)
            return
        }
        
        if let value = self._value as? Double {
            try container.encode(value)
            return
        }
        throw HexStringError.invalidType
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let value = try? container.decode(Int.self){
            self._value = value
            return
        }
        
        if let value = try? container.decode(String.self){
            try HexString.checkValidString(value: value)
            self._value = value
            return
        }
        
        if let value = try? container.decode(Double.self){
            self._value = value
            return
        }
        
        throw HexStringError.invalidType
    }
    
    static func ==(lhs: HexString, rhs: HexString) -> Bool {
        if lhs.stringValue == rhs.stringValue || lhs.intValue == rhs.intValue {
            return true
        }
        return false
    }
    
    private static func checkValidString(value: String) throws{
        if !value.starts(with: "0x") {
            throw HexStringError.invalidType
        }
        
        if !value.isHexNumber{
            throw HexStringError.invalidType
        }
        
    }
}
