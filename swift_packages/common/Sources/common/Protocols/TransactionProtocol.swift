//
//  File.swift
//
//
//  Created by Qiwei Li on 6/16/22.
//

import Foundation
import Fluent

public protocol TransactionProtocol: HealthProtocol {
    func findById(id: HexString, with database: Database?, page: Int?, perPage: Int?) async throws -> QueryResponseProtocol
}
