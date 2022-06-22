@testable import App
import XCTVapor

final class AppTests: XCTestCase {
    func testHealth() throws {
        let app = Application(.testing)
        defer { app.shutdown() }
        try configure(app)

        try app.test(.GET, "stats/transaction/health", afterResponse: { res in
            XCTAssertEqual(res.status, .ok)
        })

        // test get transaction by id
        try app.test(.GET, "stats/transaction/0xcf90ba1824dc2b58c6631c72dbedd54e155f205602613f623c026e957acb45b0", afterResponse: { res in
            XCTAssertEqual(res.status, .ok)
        })
    }
}
