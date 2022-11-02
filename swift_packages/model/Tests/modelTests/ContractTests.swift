//
//  ContractTests.swift
//  
//
//  Created by Qiwei Li on 11/2/22.
//

import XCTest
@testable import model

final class ContractTests: XCTestCase {
    func testDecode() throws {
        let json = """
        {
            "source": "string",
            "abi": [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "minter_",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "mintingAllowedAfter_",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "delegator",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "fromDelegate",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "toDelegate",
                            "type": "address"
                        }
                    ],
                    "name": "DelegateChanged",
                    "type": "event"
                }
            ],
            "bytecode": "string",
            "compiler": "string",
            "address": "abc",
            "lastScannedBlock": 0
        }
        """.data(using: .utf8)!
        
        let decoder = JSONDecoder()
        let contract = try! decoder.decode(CreateContractDto.self, from: json)
        XCTAssertEqual(contract.address, "abc")
        XCTAssertNotNil(contract.abi)
        
        let encoder = JSONEncoder()
        let encoded = try! encoder.encode(contract)
        print(String(decoding: encoded, as: UTF8.self))
    }

}
