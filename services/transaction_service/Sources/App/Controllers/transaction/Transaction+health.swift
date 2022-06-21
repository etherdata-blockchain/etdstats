//
//  File.swift
//  
//
//  Created by Qiwei Li on 6/21/22.
//

import Foundation
import Vapor
import common

extension TransactionController {
    func getHealth(req: Request) async throws -> Health {
        return await self.health()
    }
}
