//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation

open class User: Codable {
    var balance: String
    var transaction: [Transaction]
}
