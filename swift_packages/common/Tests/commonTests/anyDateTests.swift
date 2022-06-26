//
// Created by Qiwei Li on 6/21/22.
//

@testable import common
import Foundation
import XCTest

class AnyDateTests: XCTestCase {
    struct TestData: Codable {
        var date: AnyDate
    }
    func testDecode() throws {
        let data = """
        {
            "date": "2022-06-24T00:00:00.000Z"
        }
        """.data(using: .utf8)!
        let decoded = try JSONDecoder().decode(TestData.self, from: data)
        XCTAssertEqual(decoded.date.date, Date(timeIntervalSince1970: 1656028800))
    }

    func testDecode2() throws {
        let data = """
                   {
                       "date": "0x62b4fe80"
                   }
                   """.data(using: .utf8)!
        let decoded = try JSONDecoder().decode(TestData.self, from: data)
        XCTAssertEqual(decoded.date.date, Date(timeIntervalSince1970: 1656028800))
    }

    func testDecode3() throws {
        let data = TestData(date: AnyDate(Date()))
        let encoded = try JSONEncoder().encode(data)
        print(String(decoding: encoded, as: UTF8.self))
        let decoded = try JSONDecoder().decode(TestData.self, from: encoded)
        XCTAssertEqual(Int(decoded.date.date.timeIntervalSince1970), Int(data.date.date.timeIntervalSince1970))
    }

    func testDecode4() throws {
        let data = """
                   {
                       "date": 1631861312
                   }
                   """.data(using: .utf8)!
        let decoded = try JSONDecoder().decode(TestData.self, from: data)
        XCTAssertEqual(decoded.date.date, Date(timeIntervalSince1970: 1631861312))
    }

}
