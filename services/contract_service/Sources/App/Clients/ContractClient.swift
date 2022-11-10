//
//  File.swift
//
//
//  Created by Qiwei Li on 11/9/22.
//

import Alamofire
import common
import Fluent
import Foundation
import Vapor

class ContractClient {
    struct VerificationRequest: Codable {
        var source: String
        var compilerVersion: String?
        var contractName: String
    }

    struct VerificationResult: Codable {
        var compilerVersion: String
        var bytecode: String
        var abi: AnyCodableDocument
    }

    func verify(contractName: String, sourceCode: String, bytecode: String, compilerVersion: String? = nil) async throws -> VerificationResult {
        let verificationEndpoint = Environment.get(ENVIRONMENT_SOLIDITY_SERVICE_URL_KEY)!
        let verificationRequest = VerificationRequest(source: sourceCode, compilerVersion: compilerVersion, contractName: contractName)
        let request = AF.request(verificationEndpoint, method: .post, parameters: verificationRequest, encoder: JSONParameterEncoder.default).serializingDecodable(VerificationResult.self)
        let result = try await request.value
        print("Request bytecode: \(result.bytecode.count), given bytecode: \(bytecode.count)")
        if !verifyByteCode(bytecode1: result.bytecode, bytecode2: bytecode) {
            throw Abort(.badRequest, reason: "Bytecode doesn't match")
        }

        return result
    }

    private func findBytesExceptMetaData(bytecode: String) -> String {
        // get last 4 bits
        let last4 = bytecode.suffix(4)
        // convert to int
        let last4Int = Int(last4, radix: 16)!
        // get metadata length
        let metadataLength = last4Int * 2
        // get bytecode without metadata
        let bytecodeWithoutMetadata = bytecode.prefix(bytecode.count - metadataLength - 4)
        return String(bytecodeWithoutMetadata)
    }

    /**
     Verify if two bytecodes are the same using metadata bytes
     */
    func verifyByteCode(bytecode1: String, bytecode2: String) -> Bool {
        // find metadata bytes
        let bytes1 = findBytesExceptMetaData(bytecode: bytecode1)
        let bytes2 = findBytesExceptMetaData(bytecode: bytecode2)
        // compare metadata
        return bytes1 == bytes2
    }
}

extension Vapor.Request {
    var contractClient: ContractClient {
        return ContractClient()
    }
}
