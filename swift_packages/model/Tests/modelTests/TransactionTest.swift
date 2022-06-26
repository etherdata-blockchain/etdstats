//
//  TransactionTest.swift
//  
//
//  Created by Qiwei Li on 6/17/22.
//

@testable import model
import XCTest
import common

extension Encodable {
    subscript(key: String) -> Any? {
        return dictionary[key]
    }
    var dictionary: [String: Any] {
        return (try? JSONSerialization.jsonObject(with: JSONEncoder().encode(self))) as? [String: Any] ?? [:]
    }
}

class TransactionTest: XCTestCase {
    func testEncoding() throws {
        let transaction = Transaction(hash: "1",
                nonce: HexString(1), blockHash: HexString(1),
                blockNumber: HexString(1), transactionIndex: HexString(1),
                from: HexString(1), to: HexString(1), value: HexString(1),
                gasPrice: HexString(1),
                gas: HexString(1),
                timestamp: AnyDate(Date()))
        let block = Block(size:  HexString(1), extraData:  HexString(1),
                gasLimit:  HexString(1), gasUsed:  HexString(1), hash:  HexString(1),
                miner:  HexString(1), nonce:  HexString(1), number:  HexString(1),
                parentHash:  HexString(1), receiptsRoot:  HexString(1), sha3Uncles:  HexString(1),
                stateRoot:  HexString(1), timestamp: AnyDate(Date()), totalDifficulty:  HexString(1),
                transactionsRoot:  HexString(1), uncles: [], transactions: [])

        transaction.block = block
        let result = transaction.dictionary
        XCTAssertTrue(result["block"] != nil)
        XCTAssertEqual(result["nonce"] as! Int, 1)
        XCTAssertEqual(result["blockHash"] as! Int, 1)
        XCTAssertEqual(result["blockNumber"] as! Int, 1)
    }
}
