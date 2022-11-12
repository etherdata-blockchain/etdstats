import BSON
import common
import Fluent
import Foundation
import Vapor

public struct EventTransaction: Content {
    public var hash: String

    public var index: String

    public var from: String

    public var to: String?

    public var value: String
}

public struct EventData: Content {
    public var name: String

    public var value: String

    public var type: String

    public var indexed: Bool
}

public protocol EventProtocol: Content {
    var blockNumber: String { get set }

    var blockHash: String { get set }

    var blockTimestamp: String { get set }

    var transaction: EventTransaction { get set }

    var event: String { get set }

    var data: [EventData] { get set }
}

public struct CreateEventDto: EventProtocol {
    public var blockNumber: String

    public var blockHash: String

    public var blockTimestamp: String

    public var transaction: EventTransaction

    public var event: String

    public var data: [EventData]

    public func toEvent() -> Event {
        return Event(
            blockNumber: blockNumber,
            blockHash: blockHash,
            blockTimestamp: blockTimestamp,
            transaction: transaction,
            event: event,
            data: data
        )
    }
}

public struct ListEventDto: EventProtocol {
    public var blockNumber: String
    
    public var blockHash: String
    
    public var blockTimestamp: String
    
    public var transaction: EventTransaction
    
    public var event: String
    
    public var data: [EventData]
    
    
}

public struct CreateMultipleEventDto: Content {
    public var events: [CreateEventDto]
    
    public var lastScannedBlock: Int
    
    public func toEvents(contract: Contract) -> [Event] {
        return events.map {
            let event = $0.toEvent()
            event.$contract.id = contract.id!
            return event
        }
    }
}


public final class Event: Model, EventProtocol {
    public static let schema = "events"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Parent(key: "contract")
    public var contract: Contract

    @Field(key: "blockNumber")
    public var blockNumber: String

    @Field(key: "blockHash")
    public var blockHash: String

    @Field(key: "blockTimestamp")
    public var blockTimestamp: String

    @Field(key: "transaction")
    public var transaction: EventTransaction

    @Field(key: "event")
    public var event: String

    @Field(key: "data")
    public var data: [EventData]

    public init() {}

    public init(id: ObjectId? = nil, blockNumber: String, blockHash: String, blockTimestamp: String, transaction: EventTransaction, event: String, data: [EventData]) {
        self.id = id
        self.blockNumber = blockNumber
        self.blockHash = blockHash
        self.blockTimestamp = blockTimestamp
        self.transaction = transaction
        self.event = event
        self.data = data
    }
}
