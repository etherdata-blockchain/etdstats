import BSON
import common
import Fluent
import Vapor

/**
 Block structrue
 */
public final class Block: Model, Content {
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

    @Field(key: "mixHash")
    public var mixHash: Double

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
    public var timestamp: Date

    @Field(key: "totalDifficulty")
    public var totalDifficulty: HexString

    @Field(key: "transactionsRoot")
    public var transactionsRoot: HexString

    @Field(key: "uncles")
    public var uncles: [HexString]

    /**
        A list of transactions
     */
    public var transactions: [Transaction] = []

    public init() {
    }

    public init(id: ObjectId?, size: HexString, extraData: HexString, gasLimit: HexString, gasUsed: HexString, hash: HexString, miner: HexString, mixHash: Double, nonce: HexString, number: HexString, parentHash: HexString, receiptsRoot: HexString, sha3Uncles: HexString, stateRoot: HexString, timestamp: Date, totalDifficulty: HexString, transactionsRoot: HexString, uncles: [HexString]) {
        self.id = id
        self.size = size
        self.extraData = extraData
        self.gasLimit = gasLimit
        self.gasUsed = gasUsed
        self.hash = hash
        self.miner = miner
        self.mixHash = mixHash
        self.nonce = nonce
        self.number = number
        self.parentHash = parentHash
        self.receiptsRoot = receiptsRoot
        self.sha3Uncles = sha3Uncles
        self.stateRoot = stateRoot
        self.timestamp = timestamp
        self.totalDifficulty = totalDifficulty
        self.transactionsRoot = transactionsRoot
        self.uncles = uncles
    }
}
