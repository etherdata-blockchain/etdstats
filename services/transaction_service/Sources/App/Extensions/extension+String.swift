//
//  File.swift
//  
//
//  Created by Qiwei Li on 6/16/22.
//

import Foundation

extension String {
    func slice(start: Int? = nil, end: Int? = nil) -> String{
        let start = self.index(self.startIndex, offsetBy: start ?? 0)
        let end = self.index(self.endIndex, offsetBy: end ?? 0)
        let value = self[start..<end]
        return String(value)
    }
    
    var isHexNumber: Bool {
        let value = slice(start: 2)
        return value.filter(\.isHexDigit).count == value.count
    }
}
