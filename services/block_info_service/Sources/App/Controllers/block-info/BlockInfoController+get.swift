//
// Created by Qiwei Li on 6/27/22.
//

import Foundation
import Vapor
import model
import common
import Alamofire

typealias Request = Vapor.Request

extension BlockInfoController {
    /**
     Get chain id
     */
    func getChainID() async throws -> String {
        let task = AF.request(Environment.get("RPC_URL")!,
                method: .post,
                parameters: ChainIDRequest(params: []),
                encoder: JSONParameterEncoder()
        ).serializingDecodable(JSONRPCResponse<String>.self)
        let result = try? await task.value
        let chainID = result?.result
        if let chainID = chainID {
            return chainID
        }
        throw InvalidHashError.invalidFormat
    }

    func getBlockInfo(req: Request) async throws -> BlockInfo {

        let blockInfo = try await BlockInfo(
                numBlocks: BlockModel.query(on: req.db).filter(\.$isUncle, .notEqual, true).count(),
                numTransactions: TransactionModel.query(on: req.db).count(),
                blockTime: 0,
                block: BlockModel.query(on: req.db).sort(\.$numberInBase10, .descending).first(),
                blockTimeChangePercentage: "0%",
                difficultyChangePercentage: "0%",
                blockTimeHistory: [],
                difficultyHistory: [],
                chainId: getChainID(),
                rpc: Environment.get("RPC_URL")!,
                numUncles: BlockModel.query(on: req.db).filter(\.$isUncle, .equal, true).count()
        )

        return blockInfo
    }

    func get(req: Request) async throws -> BlockInfo {
        return try await self.getBlockInfo(req: req)
    }

    func health(req: Request) async throws -> Health {
        return await health()
    }
}