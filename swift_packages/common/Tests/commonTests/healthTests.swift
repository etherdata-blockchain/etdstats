//
// Created by Qiwei Li on 6/21/22.
//

@testable import common
import Foundation
import XCTest

class HealthTests: XCTestCase {
    func testDecode() throws {
        let data: [String: Any] = [
            "status": "ok",
            "total": 20,
            "numHealthyServices": 10,
            "isLeaf": false,
            "services": [
                [
                    "status": "ok",
                    "total": 20,
                    "numHealthyServices": 10,
                    "isLeaf": true,
                    "services": [],
                ],
            ],
        ] as [String: Any]

        let serializedData = try JSONSerialization.data(withJSONObject: data)
        let decoded = try JSONDecoder().decode(Health.self, from: serializedData)
        XCTAssertEqual(decoded.services.count, 1)
        XCTAssertEqual(decoded.services[0].services.count, 0)
        XCTAssertEqual(decoded.services[0].isLeaf, true)
        XCTAssertEqual(decoded.services[0].numHealthyServices, 10)
        XCTAssertEqual(decoded.services[0].total, 20)
        XCTAssertEqual(decoded.services[0].status, .ok)
        XCTAssertEqual(decoded.isLeaf, false)
        XCTAssertEqual(decoded.numHealthyServices, 10)
        XCTAssertEqual(decoded.total, 20)
        XCTAssertEqual(decoded.status, .ok)
    }
}
