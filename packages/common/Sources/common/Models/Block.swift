//
//  File.swift
//  
//
//  Created by Qiwei Li on 6/16/22.
//

import Foundation

/**
 Block structrue
 */
class Block: Codable{
    var size: HexString
    var extraData: HexString
    var gasLimit: HexString
    var gasUsed: HexString
    var hash: HexString
    var miner: HexString
    var mixHash: Double
    var nonce: HexString
    var number: HexString
    var parentHash: HexString
    var receiptsRoot: HexString
    var sha3Uncles: HexString
    var stateRoot: HexString
    var timestamp: Date
    var totalDifficulty: HexString
    var transactionsRoot: HexString
    var uncles: [HexString]
}
