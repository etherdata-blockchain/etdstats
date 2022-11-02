//
// Created by Qiwei Li on 6/26/22.
//

import Foundation
import Vapor
import model
import FluentMongoDriver
import Fluent
import common


extension ContractController {
    /**
     Create a contract
     */
    func createContract(req: Request) async throws -> CreateContractDto {
        try req.jwt.verify(as: WalletAuthenticationPayload.self)
        
        let contract = try req.content.decode(CreateContractDto.self)
        try await contract.save(on: req.db)
        return contract
    }
}
