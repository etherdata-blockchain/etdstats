//
//  File.swift
//
//
//  Created by Qiwei Li on 11/2/22.
//

import Fluent
import FluentMongoDriver
import Foundation
import model
import MongoKitten
import MongoKittenCore
import Vapor

extension EventController {
    func getEvents(req: Request) async throws -> Page<Event> {
        return try await Event.query(on: req.db).sort(\.$blockTimestamp, .descending).paginate(for: req)
    }

    func getEventsByContract(req: Request) async throws -> Page<ListEventDto> {
        guard let contractAddress = req.parameters.get("contract_address") else {
            throw Abort(.badRequest, reason: "Missing contract address")
        }

        guard let contract = try await Contract.query(on: req.db).filter(\.$address == contractAddress).first() else {
            throw Abort(.badRequest, reason: "Wrong contract address")
        }

        guard let db = req.db as? MongoDatabaseRepresentable else {
            throw Abort(.internalServerError)
        }

        let mongodb = db.raw
        let coll = mongodb[Event.schema]
        let results = try await coll.find(["contract": ["id": contract.id]]).paginate(for: req).allResults().map {
            try BSONDecoder().decode(ListEventDto.self, from: $0)
        }
        let total = try coll.count().wait()
        let pageRequest = try req.query.decode(PageRequest.self)
        return Page(items: results, metadata: .init(page: pageRequest.page, per: pageRequest.per, total: total))
    }
}

extension FindQueryBuilder {
    func paginate(for req: Request) throws -> FindQueryBuilder {
        let pageRequest = try req.query.decode(PageRequest.self)
        return self.skip(pageRequest.page * pageRequest.per).limit(pageRequest.per)
    }
}
