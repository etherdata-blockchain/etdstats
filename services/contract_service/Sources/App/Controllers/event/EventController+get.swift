//
//  File.swift
//  
//
//  Created by Qiwei Li on 11/2/22.
//

import Foundation
import model
import Vapor
import Fluent
import MongoKittenCore
import MongoKitten

extension EventController {
    func getEvents(req: Request) async throws -> Page<Event> {
        return try await Event.query(on: req.db).sort(\.$blockTimestamp, .descending).paginate(for: req)
    }
    
    func getEventsByContract(req: Request) async throws -> Page<Event> {
        guard let contractAddress = req.parameters.get("contract_address") else {
            throw Abort(.badRequest, reason: "Missing contract address")
        }
        
        guard let contract = try await Contract.query(on: req.db).filter(\.$address == contractAddress).first() else {
            throw Abort(.badRequest, reason: "Wrong contract address")
        }
        
        let events = try await contract.$events.query(on: req.db).sort(\.$blockTimestamp).paginate(for: req)
        return events
    }
}
