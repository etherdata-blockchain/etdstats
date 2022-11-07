//
// Created by Qiwei Li on 6/26/22.
//

import Foundation
import Vapor
import common
import model
import Fluent

extension ContractController {
    struct SearchQuery: Content {
        let keyword: String
    }
    
    struct ListQuery: Content {
        var showAbi: Bool = false
    }
    
    func health(req: Request) async throws -> Health {
        return await self.health()
    }
    
    /**
     List contracts with pagination
     */
    func listContracts(req: Request) async throws -> Page<ContractListDto> {
        let query = try req.query.decode(ListQuery.self)
        let data = try await ContractListDto.query(on: req.db).sort(\.$blockTime).paginate(for: req)
        if !query.showAbi {
            let items = data.items.map{item in
                item.abi = nil
                return item
            }
            let returnedData: Page<ContractListDto> = Page(items: items, metadata: data.metadata)
            return returnedData
        }
        
        return data
    }
    
    /**
     Search contracts based on contract address
     */
    func search(req: Request) async throws -> [ContractListDto]{
        let payload = try req.jwt.verify(as: WalletAuthenticationPayload.self)
        let query = try req.query.decode(SearchQuery.self)
        let data = try await ContractListDto.query(on: req.db).filter(\.$address ~~ query.keyword).filter(\.$creator == payload.userId.lowercased()).limit(10).all()
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
