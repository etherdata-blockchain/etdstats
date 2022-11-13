//
// Created by Qiwei Li on 6/26/22.
//

import Foundation
import Vapor
import model
import FluentMongoDriver
import Fluent
import common
import BSON

extension ContractController {
    /**
     Create a contract
     */
    func updateContract(req: Request) async throws -> Response {
        //TODO: add verify user's address match creator's address in the future
        let payload = try req.jwt.verify(as: WalletAuthenticationPayload.self)
        
        guard let contractAddress = req.parameters.get("contract_address") else {
            throw Abort(.badRequest, reason: "Missing contract address")
        }
        let contractData = try req.content.decode(ContractUpdateDto.self)
        guard let previousContract = try await Contract.query(on: req.db).filter(\.$address == contractAddress).first() else {
            throw Abort(.badRequest, reason: "Cannot find contract with address \(contractAddress)")
        }
        guard let sourceCode = contractData.source else {
            throw Abort(.badRequest, reason: "Source code is required")
        }
        
        var query = ContractUpdateDto.query(on: req.db)
        
        if let name = contractData.name {
            query = query.set(\.$name, to: name)
        }
        
        if let compiler = contractData.compiler {
            query = query.set(\.$compiler, to: compiler)
        }
        
        let verifiedResult = try await req.contractClient.verify(contractName: contractData.name!, sourceCode: sourceCode, bytecode: previousContract.byteCode, compilerVersion: contractData.compiler!)
        
       
        query = query.set(\.$abi, to: verifiedResult.abi).set(\.$source, to: sourceCode).set(\.$compiler, to: contractData.compiler)
        
        let encodedPreviousAbi = try? JSONEncoder().encode(previousContract.abi)
        let encodedCurrentAbi = try? JSONEncoder().encode(verifiedResult.abi)
        
        if encodedCurrentAbi != encodedPreviousAbi {
            req.logger.info("ABI has changed, reset last scanned block to 0")
            query = query.set(\.$lastScannedBlock, to: 0)
        }
 
        
        if let source = contractData.source {
            query = query.set(\.$source, to: source)
        }
        
        try await query
            .filter(\.$address == contractAddress)
            .filter(\.$creator == payload.userId.lowercased())
            .update()
        return Response(status: .accepted)
    }
}
