//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor


public struct RecentTransaction: Content {
    public var date: String
    public var count: Int

    public init(date: String, count: Int) {
        self.date = date
        self.count = count
    }
}

public struct User: Content {
    public var balance: String
    public var transactions: [Transaction]
    public var totalTransactionsReceived: Int
    public var totalTransactionsSent: Int
    public var recentTransactions: [RecentTransaction]
    public var totalTransactions: Int?
    public var itemsPerPage: Int?

    public init(balance: String, transactions: [Transaction], totalTransactionsReceived: Int, totalTransactionsSent: Int, recentTransactions: [RecentTransaction], totalTransactions: Int?, itemsPerPage: Int?) {
        self.balance = balance
        self.transactions = transactions
        self.totalTransactionsReceived = totalTransactionsReceived
        self.totalTransactionsSent = totalTransactionsSent
        self.recentTransactions = recentTransactions
        self.totalTransactions = totalTransactions
        self.itemsPerPage = itemsPerPage
    }
}
