//
//  TransactionTest.swift
//  
//
//  Created by Qiwei Li on 6/17/22.
//

@testable import model
import XCTest
import common


class BlockTest: XCTestCase {
    func testEncoding() throws {
        let block = Block(size:  HexString(1), extraData:  HexString(1),
                gasLimit:  HexString(1), gasUsed:  HexString(1), hash:  HexString(1),
                miner:  HexString(1), nonce:  HexString(1), number:  HexString(1),
                parentHash:  HexString(1), receiptsRoot:  HexString(1), sha3Uncles:  HexString(1),
                stateRoot:  HexString(1), timestamp: AnyDate(Date()), totalDifficulty:  HexString(1),
                transactionsRoot:  HexString(1), uncles: [], transactions: [])

        let result = block.dictionary
        XCTAssertEqual(result["size"] as! Int, 1)
        XCTAssertEqual(result["extraData"] as! Int, 1)
        XCTAssertEqual(result["gasLimit"] as! Int, 1)
        XCTAssertEqual(result["gasUsed"] as! Int, 1)
        XCTAssertEqual(result["hash"] as! Int, 1)
        XCTAssertEqual(result["miner"] as! Int, 1)
        XCTAssertEqual(result["nonce"] as! Int, 1)
        XCTAssertEqual(result["number"] as! Int, 1)
        XCTAssertEqual((result["transactions"] as! [Transaction]).count, 0)
    }
}
