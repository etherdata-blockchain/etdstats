//
//  EventTests.swift
//  
//
//  Created by Qiwei Li on 11/12/22.
//

import XCTest
@testable import App
@testable import common
@testable import MongoKitten
import Vapor
import model

final class AppTests: XCTestCase {
    
    var db: MongoDatabase?
    
    override func setUpWithError() throws {
        setenv(ENVIRONMENT_DB_KEY, "mongodb://root:password@localhost:27017/test", 1)
        setenv(ENVIRONMENT_JWT_KEY, "password", 1)
        setenv(ENVIRONMENT_SOLIDITY_SERVICE_URL_KEY, "https://solidity_service_url.com", 1)
        
        db = try MongoDatabase.synchronousConnect("mongodb://root:password@localhost:27017/test")
        
        let contract = model.ContractCreateDto(blockNumber: "0x0", blockTime: 0, creator: "0xabcde", transactionHash: "0xabcde", blockHash: "0xabcde", byteCode: "", address: "0xabcde", lastScannedBlock: 0)
        let contracts = db?[model.Contract.schema]
        let _ = try contracts?.insertEncoded(contract).wait()
    }
    
    override func tearDownWithError() throws {
        try db?.drop().wait()
    }
    
    func testCRUDContracts() throws {
        let app = Application(.testing)
        defer { app.shutdown() }
        try configure(app)
        try app.test(.GET, "stats/contract/contract/0xabcde", afterResponse: { res in
            XCTAssertEqual(res.status, .ok)
        })
        
    }
}
