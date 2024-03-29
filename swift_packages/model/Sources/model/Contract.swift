import AnyCodable
import BSON
import Fluent
import Foundation
import Vapor

public protocol ContractCreateProtocol: Content {
    var creator: String { get set }
    
    var transactionHash: String { get set }
    
    var blockHash: String { get set }

    var byteCode: String { get set }

    var address: String { get set }

    var lastScannedBlock: Int { get set }
    
    var blockNumber: String { get set }
    
    var blockTime: Int { get set }
    
}

public protocol ContractUpdateProtocol: Content {
    var name: String? { get set }
    
    var compiler: String? { get set }
    
    var source: String? { get set }
}

public protocol ContractListProtocol: Content {
    var creator: String { get set }
    
    var transactionHash: String { get set }
    
    var blockHash: String { get set }

    var address: String { get set }

    var lastScannedBlock: Int { get set }
    
    var blockTime: Int { get set }
    
    var blockNumber: String { get set }
}

public struct ContractCreateDto: ContractCreateProtocol {
    public var blockNumber: String
    
    public var blockTime: Int
    
    public var creator: String
    
    public var transactionHash: String
    
    public var blockHash: String
    
    public var byteCode: String
    
    public var address: String
    
    public var lastScannedBlock: Int
    
    public init(blockNumber: String, blockTime: Int, creator: String, transactionHash: String, blockHash: String, byteCode: String, address: String, lastScannedBlock: Int) {
        self.blockNumber = blockNumber
        self.blockTime = blockTime
        self.creator = creator
        self.transactionHash = transactionHash
        self.blockHash = blockHash
        self.byteCode = byteCode
        self.address = address
        self.lastScannedBlock = lastScannedBlock
    }
}

public final class ContractUpdateDto: Model, ContractUpdateProtocol {
    public init() {
        
    }
    
    public static var schema = Contract.schema
    
    @ID(custom: "_id")
    public var id: ObjectId?
    
    @OptionalField(key: "name")
    public var name: String?
    
    @OptionalField(key: "compiler")
    public var compiler: String?
    
    @OptionalField(key: "source")
    public var source: String?
    
    @OptionalField(key: "abi")
    public var abi: AnyCodable?
    
    @OptionalField(key: "address")
    public var address: String?
    
    @OptionalField(key: "creator")
    public var creator: String?
    
    @OptionalField(key: "lastScannedBlock")
    public var lastScannedBlock: Int?
    
    public init(id: ObjectId? = nil, name: String? = nil, compiler: String? = nil, source: String? = nil, abi: AnyCodable? = nil, creator: String? = nil) {
        self.id = id
        self.name = name
        self.compiler = compiler
        self.source = source
        self.abi = abi
        self.creator = creator
    }
}


public final class ContractListDto: Model, ContractListProtocol {
    public init() {
        
    }
    
    public static var schema = Contract.schema
    
    @ID(custom: "_id")
    public var id: ObjectId?
    
    @OptionalField(key: "name")
    public var name: String?
    
    @Field(key: "creator")
    public var creator: String
    
    @Field(key: "transactionHash")
    public var transactionHash: String
    
    @Field(key: "blockHash")
    public var blockHash: String
    
    @Field(key: "address")
    public var address: String
    
    @Field(key: "lastScannedBlock")
    public var lastScannedBlock: Int
    
    @OptionalField(key: "abi")
    public var abi: Document?
    
    @Field(key: "blockTime")
    public var blockTime: Int
    
    @Field(key: "blockNumber")
    public var blockNumber: String
    
}


public final class Contract: Model, ContractCreateProtocol, ContractUpdateProtocol {
    public static let schema = "contracts"

    @ID(custom: "_id")
    public var id: ObjectId?
    
    @OptionalField(key: "name")
    public var name: String?
    
    @Field(key: "creator")
    public var creator: String
    
    @Field(key: "transactionHash")
    public var transactionHash: String
    
    @Field(key: "blockHash")
    public var blockHash: String

    @OptionalField(key: "source")
    public var source: String?

    @OptionalField(key: "abi")
    public var abi: Document?

    @Field(key: "byteCode")
    public var byteCode: String

    @OptionalField(key: "compiler")
    public var compiler: String?

    @Field(key: "address")
    public var address: String

    @Field(key: "lastScannedBlock")
    public var lastScannedBlock: Int
    
    @Children(for: \.$contract)
    public var events: [Event]
    
    @Field(key: "blockTime")
    public var blockTime: Int
    
    @Field(key: "blockNumber")
    public var blockNumber: String

    public init() {}
}
