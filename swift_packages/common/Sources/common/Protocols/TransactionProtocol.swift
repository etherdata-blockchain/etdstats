//
//  File.swift
//
//
//  Created by Qiwei Li on 6/16/22.
//

import Foundation
import Fluent
import Vapor

public protocol TransactionProtocol: HealthProtocol {
    associatedtype DBClient: DatabaseProtocol
    func findById(id: HexString, with database: DBClient, page: Int?, perPage: Int?) async throws -> QueryResponseProtocol
}
