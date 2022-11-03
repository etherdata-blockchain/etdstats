//
// Created by Qiwei Li on 6/26/22.
//

import Foundation
import Vapor
import common
import model
import Fluent

extension ContractController {
    func health(req: Request) async throws -> Health {
        return await self.health()
    }
    
    /**
     List contracts with pagination
     */
    func listContracts(req: Request) async throws -> Page<ContractListDto> {
        let data = try await ContractListDto.query(on: req.db).paginate(for: req)
        return data
    }
    
    /**
     Get contract detail by address
     */
    func getContractByAddress(req: Request) async throws -> Contract {
        guard let address = req.parameters.get("contract_address") else {
            throw Abort(.badRequest, reason: "Missing required path parameter 'contract_address'")
        }
        guard let contract = try await Contract.query(on: req.db).filter(\.$address == address).first() else {
            throw Abort(.badRequest, reason: "Cannot find contract with address \(address)")
        }
        
        return contract
    }
    
}
