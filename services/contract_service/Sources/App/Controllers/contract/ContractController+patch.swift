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
        let previousContract = try await Contract.query(on: req.db).filter(\.$address == contractAddress).first()
        
        var query = ContractUpdateDto.query(on: req.db)
        
        if let name = contractData.name {
            query = query.set(\.$name, to: name)
        }
        
        if let compiler = contractData.compiler {
            query = query.set(\.$compiler, to: compiler)
        }
        
        if let abi = contractData.abi {
            query = query.set(\.$abi, to: abi)
            let encodedPreviousAbi = try? JSONEncoder().encode(previousContract?.abi)
            let encodedCurrentAbi = try? JSONEncoder().encode(abi)
            
            if encodedCurrentAbi != encodedPreviousAbi {
                req.logger.info("ABI has changed, reset last scanned block to 0")
                query = query.set(\.$lastScannedBlock, to: 0)
            }
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
