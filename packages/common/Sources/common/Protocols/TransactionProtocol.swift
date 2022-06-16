//
//  File.swift
//
//
//  Created by Qiwei Li on 6/16/22.
//

import Foundation

public protocol TransactionProtocol {
    func findById(id: HexString) async throws -> QueryResponse
}
