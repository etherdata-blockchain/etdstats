//
//  File.swift
//
//
//  Created by Qiwei Li on 6/14/22.
//

import Foundation

public class Transaction: Codable {
    var hash: String
    var nonce: HexString
    var blockHash: HexString
    var blockNumber: HexString
    var transactionIndex: HexString
    var from: HexString
    var to: HexString
    var value: HexString
    var gasPrice: HexString
    var gas: HexString
    var maxPriorityFeeperGas: HexString?
    var maxFeePerGas: HexString?
    var input: HexString?
}


