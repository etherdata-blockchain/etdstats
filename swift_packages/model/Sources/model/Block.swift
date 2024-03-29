import BSON
import common
import Fluent
import Foundation
import Vapor

public protocol BlockProtocol: Content {
    var size: HexString { get set }

    var extraData: HexString { get set }

    var gasLimit: HexString { get set }

    var gasUsed: HexString { get set }

    var hash: HexString { get set }

    var miner: HexString { get set }

    var nonce: HexString { get set }

    var number: HexString { get set }

    var parentHash: HexString { get set }

    var receiptsRoot: HexString { get set }

    var sha3Uncles: HexString { get set }

    var stateRoot: HexString { get set }

    var timestamp: AnyDate { get set }

    var totalDifficulty: HexString? { get set }

    var uncles: [HexString] { get set }
}

/**
 Block structrue
 */
public struct Block: BlockProtocol {

    public var size: HexString

    public var extraData: HexString

    public var gasLimit: HexString

    public var gasUsed: HexString

    public var hash: HexString

    public var miner: HexString

    public var nonce: HexString

    public var number: HexString

    public var parentHash: HexString

    public var receiptsRoot: HexString

    public var sha3Uncles: HexString

    public var stateRoot: HexString

    public var timestamp: AnyDate

    public var totalDifficulty: HexString?

    public var transactionsRoot: HexString?

    public var uncles: [HexString]

    public var minerInfo: UserInfoModel?

    /**
        A list of transactions
     */
    public var transactions: [Transaction]?
}

public final class BlockModel: Model, BlockProtocol {
    public init() {
    }

    public static let schema = "blocks"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Field(key: "size")
    public var size: HexString

    @Field(key: "extraData")
    public var extraData: HexString

    @Field(key: "gasLimit")
    public var gasLimit: HexString

    @Field(key: "gasUsed")
    public var gasUsed: HexString

    @Field(key: "hash")
    public var hash: HexString

    @Field(key: "miner")
    public var miner: HexString

    @Field(key: "nonce")
    public var nonce: HexString

    @Field(key: "number")
    public var number: HexString

    @Field(key: "parentHash")
    public var parentHash: HexString

    @Field(key: "receiptsRoot")
    public var receiptsRoot: HexString

    @Field(key: "sha3Uncles")
    public var sha3Uncles: HexString

    @Field(key: "stateRoot")
    public var stateRoot: HexString

    @Field(key: "timestamp")
    public var timestamp: AnyDate

    @OptionalField(key: "totalDifficulty")
    public var totalDifficulty: HexString?

    @Field(key: "uncles")
    public var uncles: [HexString]

    @Field(key: "numberInBase10")
    public var numberInBase10: Int

    @OptionalField(key: "isUncle")
    public var isUncle: Bool?

    public init(size: HexString, extraData: HexString, gasLimit: HexString, gasUsed: HexString, hash: HexString, miner: HexString, nonce: HexString, number: HexString, parentHash: HexString, receiptsRoot: HexString, sha3Uncles: HexString, stateRoot: HexString, timestamp: AnyDate, totalDifficulty: HexString?, uncles: [HexString], numberInBase10: Int, isUncle: Bool?) {
        self.size = size
        self.extraData = extraData
        self.gasLimit = gasLimit
        self.gasUsed = gasUsed
        self.hash = hash
        self.miner = miner
        self.nonce = nonce
        self.number = number
        self.parentHash = parentHash
        self.receiptsRoot = receiptsRoot
        self.sha3Uncles = sha3Uncles
        self.stateRoot = stateRoot
        self.timestamp = timestamp
        self.totalDifficulty = totalDifficulty
        self.uncles = uncles
        self.numberInBase10 = numberInBase10
        self.isUncle = isUncle
    }
}

extension BlockModel {
    public func toBlock() -> Block {
        return Block(size: size, extraData: extraData, gasLimit: gasLimit, gasUsed: gasUsed, hash: hash, miner: miner, nonce: nonce, number: number, parentHash: parentHash, receiptsRoot: receiptsRoot, sha3Uncles: sha3Uncles, stateRoot: stateRoot, timestamp: timestamp, totalDifficulty: totalDifficulty, transactionsRoot: nil, uncles: uncles, minerInfo: nil, transactions: nil)
    }
}
