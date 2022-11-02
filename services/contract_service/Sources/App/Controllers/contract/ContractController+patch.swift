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
    func updateContract(req: Request) async throws -> Response {
        try req.jwt.verify(as: WalletAuthenticationPayload.self)
        
        guard let contractAddress = req.parameters.get("contract_address") else {
            throw Abort(.badRequest, reason: "Missing contract address")
        }
        let contractData = try req.content.decode(Contract.self)
        try await Contract.query(on: req.db).set(\.$lastScannedBlock, to: contractData.lastScannedBlock).filter(\.$address == contractAddress).update()
        return Response(status: .accepted)
    }
}
