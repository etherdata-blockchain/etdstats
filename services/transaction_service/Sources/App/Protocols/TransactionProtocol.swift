//
//  File.swift
//  
//
//  Created by Qiwei Li on 6/16/22.
//

import Foundation
import FluentKit


protocol TransactionProtocol {
    func findById(id: HexString, with db: Database) async throws -> QueryResponse
}
