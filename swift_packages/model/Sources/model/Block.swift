import BSON
import common
import Fluent
import Vapor

/**
 Block structrue
 */
public struct Block: Content {

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

    public var totalDifficulty: HexString

    public var transactionsRoot: HexString

    public var uncles: [HexString]


    /**
        A list of transactions
     */
    public var transactions: [Transaction]?
}
