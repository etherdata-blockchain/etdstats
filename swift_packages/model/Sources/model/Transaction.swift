import BSON
import common
import Fluent
import Foundation
import Vapor

protocol TransactionProtocol: Content {
    var hash: String { get set }
    var nonce: HexString { get set }
    var blockHash: HexString? { get set }
    var blockNumber: HexString? { get set }
    var transactionIndex: HexString { get set }
    var from: HexString { get set }
    var to: HexString { get set }
    var value: HexString { get set }
    var gasPrice: HexString { get set }
    var gas: HexString { get set }
    var maxPriorityFeeperGas: HexString? { get set }
    var maxFeePerGas: HexString? { get set }
    var input: HexString? { get set }
    var timestamp: AnyDate? { get set }
}

public struct Transaction: TransactionProtocol {
    public var hash: String
    public var nonce: HexString
    public var blockHash: HexString?
    public var blockNumber: HexString?
    public var transactionIndex: HexString
    public var from: HexString
    public var to: HexString
    public var value: HexString
    public var gasPrice: HexString
    public var gas: HexString
    public var maxPriorityFeeperGas: HexString?
    public var maxFeePerGas: HexString?
    public var input: HexString?
    public var block: Block?
    public var timestamp: AnyDate?
    public var fromUserInfo: UserInfoModel?
    public var toUserInfo: UserInfoModel?
}


public final class TransactionModel: TransactionProtocol, Model {
    public static let schema = "transactions"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Field(key: "hash")
    public var hash: String

    @Field(key: "nonce")
    public var nonce: HexString

    @Field(key: "blockHash")
    public var blockHash: HexString?

    @Field(key: "blockNumber")
    public var blockNumber: HexString?

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


    @OptionalField(key: "timestamp")
    public var timestamp: AnyDate?

    public init() {
    }

    public init(id: ObjectId?, hash: String, nonce: HexString, blockHash: HexString?, blockNumber: HexString?, transactionIndex: HexString, from: HexString, to: HexString, value: HexString, gasPrice: HexString, gas: HexString, maxPriorityFeeperGas: HexString?, maxFeePerGas: HexString?, input: HexString?, timestamp: AnyDate?) {
        self.id = id
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
        self.timestamp = timestamp
    }
}


public extension TransactionModel {
    func toTransaction() -> Transaction {
        return Transaction(hash: hash,
                nonce: nonce,
                blockHash: blockHash,
                blockNumber: blockNumber,
                transactionIndex: transactionIndex,
                from: from,
                to: to,
                value: value,
                gasPrice: gasPrice,
                gas: gas,
                maxPriorityFeeperGas: maxPriorityFeeperGas,
                maxFeePerGas: maxFeePerGas,
                input: input,
                block: nil,
                timestamp: timestamp,
                fromUserInfo: nil,
                toUserInfo: nil
        )
    }
}
