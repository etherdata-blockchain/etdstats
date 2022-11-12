//
//  File.swift
//  
//
//  Created by Qiwei Li on 11/2/22.
//

import Foundation
import model
import Fluent
import Vapor
import common
import FluentMongoDriver
import BSON
import MongoKitten
import MongoClient

extension EventController {
    func createMultipleEvents(req: Request) async throws -> Response{
        try req.jwt.verify(as: WalletAuthenticationPayload.self)
        guard let contractAddress = req.parameters.get("contract_address") else {
            throw Abort(.badRequest, reason: "Missing contract address")
        }
        
        let events = try req.content.decode(CreateMultipleEventDto.self)
        guard let contract = try await Contract.query(on: req.db).filter(\.$address == contractAddress).first() else {
            req.logger.error("The given contract address [\(contractAddress)] is not found")
            throw Abort(.notFound, reason: "The given contract address [\(contractAddress)] is not found")
        }
        
        // upsert many events
        let eventToBeCreated = events.toEvents(contract: contract)
        if eventToBeCreated.count > 0 {
            guard let db = req.db as? MongoDatabaseRepresentable else {
                throw Abort(.internalServerError)
            }
            
            let mongodb = db.raw
            let coll = mongodb[Event.schema]
            let documents = try eventToBeCreated.map { model in
                return try BSONEncoder().encode(model)
            }
            
            let result = try coll.insertMany(documents, ordered: false).wait()
            req.logger.info("Insert \(result.insertCount) events to contract \(contractAddress)")
        }
        
        contract.lastScannedBlock = events.lastScannedBlock
        try await contract.save(on: req.db)
        return Response(status: .ok)
    }
}
