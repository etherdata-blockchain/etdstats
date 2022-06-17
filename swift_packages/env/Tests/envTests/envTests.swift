import XCTest
@testable import env

final class env_checkerTests: XCTestCase {
    override class func setUp() {
        setenv("TEST_KEY", "1", 1)
        setenv("TEST_KEY2", "1", 1)
    }

    func testIsNotMissing() throws {

        let checker = EnvChecker(envs: ["TEST_KEY", "TEST_KEY2"])
        let result = checker.check()
        XCTAssertEqual(result.missingKeys, [])
        XCTAssertEqual(result.isNotMissing, true)
    }

    func testIsNotMissing2() throws {
        let checker = EnvChecker(envs: [])
        let result = checker.check()
        XCTAssertEqual(result.missingKeys, [])
        XCTAssertEqual(result.isNotMissing, true)
    }

    func testIsNotMissing3() throws {
        let checker = EnvChecker(envs: ["TEST_KEY3"])
        let result = checker.check()
        XCTAssertEqual(result.missingKeys, ["TEST_KEY3"])
        XCTAssertEqual(result.isNotMissing, false)
    }

    func testIsNotMissing4() throws {
        let checker = EnvChecker(envs: ["TEST_KEY2","TEST_KEY3"])
        let result = checker.check()
        XCTAssertEqual(result.missingKeys, ["TEST_KEY3"])
        XCTAssertEqual(result.isNotMissing, false)
    }
}
