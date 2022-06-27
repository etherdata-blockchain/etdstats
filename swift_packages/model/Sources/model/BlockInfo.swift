//
// Created by Qiwei Li on 6/27/22.
//

import Foundation
import Vapor

// MARK: - BlockInfo
public struct BlockInfo: Content {
    public var numBlocks, numTransactions, blockTime: Int
    public var block: BlockModel?
    public var blockTimeChangePercentage, difficultyChangePercentage: String
    public var blockTimeHistory, difficultyHistory: [Int]

    public init(numBlocks: Int, numTransactions: Int, blockTime: Int, block: BlockModel?, blockTimeChangePercentage: String, difficultyChangePercentage: String, blockTimeHistory: [Int], difficultyHistory: [Int]) {
        self.numBlocks = numBlocks
        self.numTransactions = numTransactions
        self.blockTime = blockTime
        self.block = block
        self.blockTimeChangePercentage = blockTimeChangePercentage
        self.difficultyChangePercentage = difficultyChangePercentage
        self.blockTimeHistory = blockTimeHistory
        self.difficultyHistory = difficultyHistory
    }
}