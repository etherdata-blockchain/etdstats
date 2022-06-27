//
// Created by Qiwei Li on 6/27/22.
//

import Foundation
import Vapor
import model
import common

extension BlockInfoController {
    func getBlockInfo(req: Request) async throws -> BlockInfo {
        let blockInfo = try await BlockInfo(
                numBlocks: BlockModel.query(on: req.db).count(),
                numTransactions: Transaction.query(on: req.db).count(),
                blockTime: 0,
                block: BlockModel.query(on: req.db).sort(\.$numberInBase10, .descending).first(),
                blockTimeChangePercentage: "0%",
                difficultyChangePercentage: "0%",
                blockTimeHistory: [],
                difficultyHistory: []
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