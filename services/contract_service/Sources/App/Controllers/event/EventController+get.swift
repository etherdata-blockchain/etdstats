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

extension EventController {
    func getEvents(req: Request) async throws -> Page<Event> {
        return try await Event.query(on: req.db).paginate(for: req)
    }
}
