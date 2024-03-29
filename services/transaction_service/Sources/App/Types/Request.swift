//
//  File.swift
//
//
//  Created by Qiwei Li on 6/16/22.
//

import Foundation
import Vapor
import common


struct TransactionRequest: Content {
    var jsonrpc: String = "2.0"
    var method: String = "eth_getTransactionByHash"
    var params: [HexString]
    var id: String = "abcde"
}

struct BlockRequest: Content {
    var jsonrpc: String = "2.0"
    var method: String = "eth_getBlockByHash"
    var params: [AnyCodable]
    var id: String = "abcde"
}

struct BalanceRequest: Content {
    var jsonrpc: String = "2.0"
    var method: String = "eth_getBalance"
    var params: [String]
    var id: String = "abcde"
}
