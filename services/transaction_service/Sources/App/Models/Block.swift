import Fluent
import Vapor
import BigInt
import BSON

/**
 Block structrue
 */
final class Block: Model, Content {
    static let schema = "blocks"
    
    @ID(custom: "_id")
    var id: ObjectId?

    @Field(key: "size")
    var size: HexString

    @Field(key: "extraData")
    var extraData: HexString

    @Field(key: "gasLimit")
    var gasLimit: HexString

    @Field(key: "gasUsed")
    var gasUsed: HexString
    
    @Field(key: "hash")
    var hash: HexString

    @Field(key: "miner")
    var miner: HexString

    @Field(key: "mixHash")
    var mixHash: Double

    @Field(key: "nonce")
    var nonce: HexString

    @Field(key: "number")
    var number: HexString

    @Field(key: "parentHash")
    var parentHash: HexString

    @Field(key: "receiptsRoot")
    var receiptsRoot: HexString

    @Field(key: "sha3Uncles")
    var sha3Uncles: HexString

    @Field(key: "stateRoot")
    var stateRoot: HexString

    @Field(key: "timestamp")
    var timestamp: Date

    @Field(key: "totalDifficulty")
    var totalDifficulty: HexString

    @Field(key: "transactionsRoot")
    var transactionsRoot: HexString

    @Field(key: "uncles")
    var uncles: [HexString]
}
