//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

public struct User: Content {
    public var balance: String
    public var transaction: [Transaction]

    public init(balance: String, transaction: [Transaction]) {
        self.balance = balance
        self.transaction = transaction
    }
}
