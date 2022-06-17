import BSON
import common
import Fluent
import Foundation
import Vapor

public final class Transaction: Model, Content {
    public static let schema = "transactions"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Field(key: "hash")
    public var hash: String

    @Field(key: "nonce")
    public var nonce: HexString

    @Field(key: "blockHash")
    public var blockHash: HexString

    @Field(key: "blockNumber")
    public var blockNumber: HexString

    @Field(key: "transactionIndex")
    public var transactionIndex: HexString

    @Field(key: "from")
    public var from: HexString

    @Field(key: "to")
    public var to: HexString

    @Field(key: "value")
    public var value: HexString

    @Field(key: "gasPrice")
    public var gasPrice: HexString

    @Field(key: "gas")
    public var gas: HexString

    @OptionalField(key: "maxPriorityFeePerGas")
    public var maxPriorityFeeperGas: HexString?

    @OptionalField(key: "maxFeePerGas")
    public var maxFeePerGas: HexString?

    @OptionalField(key: "input")
    public var input: HexString?

    public init() {}

    public init(
        hash: String,
        nonce: HexString,
        blockHash: HexString,
        blockNumber: HexString,
        transactionIndex: HexString,
        from: HexString,
        to: HexString,
        value: HexString,
        gasPrice: HexString,
        gas: HexString,
        maxPriorityFeeperGas: HexString? = nil,
        maxFeePerGas: HexString? = nil,
        input: HexString? = nil
    ) {
        self.hash = hash
        self.nonce = nonce
        self.blockHash = blockHash
        self.blockNumber = blockNumber
        self.transactionIndex = transactionIndex
        self.from = from
        self.to = to
        self.value = value
        self.gasPrice = gasPrice
        self.gas = gas
        self.maxPriorityFeeperGas = maxPriorityFeeperGas
        self.maxFeePerGas = maxFeePerGas
        self.input = input
    }
}
