//
//  TestHexString.swift
//  
//
//  Created by Qiwei Li on 6/15/22.
//

import XCTest
@testable import App

class TestHexString: XCTestCase {
    struct TestStruct: Codable {
        var blockNumber: HexString
        var value: HexString
    }
    

    func testSuccessInit() throws {
        var hexString = HexString(10)
        XCTAssertEqual(hexString.stringValue, "0xa")
        XCTAssertEqual(hexString.intValue, 10)
        
        hexString = HexString(0)
        XCTAssertEqual(hexString.stringValue, "0x0")
        XCTAssertEqual(hexString.intValue, 0)
        
        hexString = try HexString("0xa")
        XCTAssertEqual(hexString.stringValue, "0xa")
        XCTAssertEqual(hexString.intValue, 10)
        
        hexString = try HexString("0x")
        XCTAssertEqual(hexString.stringValue, "0x")
        XCTAssertEqual(hexString.intValue, 0)
        
        hexString = HexString(20.4)
        XCTAssertEqual(hexString.intValue, 20)
    }
    
    func testFailInit() throws {
        XCTAssertThrowsError(try HexString("abcde"))
        XCTAssertThrowsError(try HexString("z"))
        XCTAssertThrowsError(try HexString("0xz"))
        XCTAssertThrowsError(try HexString("0"))
    }
    
    func testEncodeSuccess() throws {
        let data = TestStruct(blockNumber: try HexString("0xb"), value: HexString(20))
        let encoded = try JSONEncoder().encode(data)
        let decoded = try JSONDecoder().decode(TestStruct.self, from: encoded)
        XCTAssertEqual(data.blockNumber, decoded.blockNumber)
        XCTAssertEqual(data.value, decoded.value)
    }
    
    func testDecodeSuccess() throws {
        let data: [String: String] = ["blockNumber": "0xa", "value": "0xb"]
        let encoded = try JSONEncoder().encode(data)
        let decoded = try JSONDecoder().decode(TestStruct.self, from: encoded)
        XCTAssertEqual(decoded.blockNumber.stringValue, "0xa")
        XCTAssertEqual(decoded.value.stringValue, "0xb")
    }
    
    func testDecodeFail() throws {
        let data: [String: String] = ["blockNumber": "0", "value": "0xb"]
        let encoded = try JSONEncoder().encode(data)
        XCTAssertThrowsError(try JSONDecoder().decode(TestStruct.self, from: encoded))
    }
}
