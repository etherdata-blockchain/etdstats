import AnyCodable
import BSON
import Fluent
import Foundation
import Vapor

public protocol ContractCreateProtocol: Content {
    var creator: String { get set }
    
    var transactionHash: String { get set }
    
    var blockHash: String { get set }

    var bytecode: String { get set }

    var address: String { get set }

    var lastScannedBlock: Int { get set }
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
}

public final class ContractUpdateDto: Model, ContractUpdateProtocol {
    public init() {
        
    }
    
    public static var schema = Contract.schema
    
    @ID(custom: "_id")
    public var id: ObjectId?
    
    @Field(key: "name")
    public var name: String?
    
    @Field(key: "compiler")
    public var compiler: String?
    
    @Field(key: "source")
    public var source: String?
    
    @Field(key: "abi")
    public var abi: AnyCodable?
    
    @Field(key: "address")
    public var address: String?
    
    public init(id: ObjectId? = nil, name: String? = nil, compiler: String? = nil, source: String? = nil, abi: AnyCodable? = nil) {
        self.id = id
        self.name = name
        self.compiler = compiler
        self.source = source
        self.abi = abi
    }
}


public final class ContractListDto: Model, ContractListProtocol {
    public init() {
        
    }
    
    public static var schema = Contract.schema
    
    @ID(custom: "_id")
    public var id: ObjectId?
    
    @Field(key: "name")
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
}


public final class Contract: Model, ContractCreateProtocol, ContractUpdateProtocol {
    public static let schema = "contracts"

    @ID(custom: "_id")
    public var id: ObjectId?
    
    @Field(key: "name")
    public var name: String?
    
    @Field(key: "creator")
    public var creator: String
    
    @Field(key: "transactionHash")
    public var transactionHash: String
    
    @Field(key: "blockHash")
    public var blockHash: String

    @Field(key: "source")
    public var source: String?

    @Field(key: "abi")
    public var abi: Document?

    @Field(key: "byteCode")
    public var bytecode: String

    @Field(key: "compiler")
    public var compiler: String?

    @Field(key: "address")
    public var address: String

    @Field(key: "lastScannedBlock")
    public var lastScannedBlock: Int
    
    @Children(for: \.$contract)
    public var events: [Event]

    public init() {}

    init(id: ObjectId? = nil, source: String, abi: Document, bytecode: String, compiler: String, address: String, lastScannedBlock: Int) {
        self.id = id
        self.source = source
        self.abi = abi
        self.bytecode = bytecode
        self.compiler = compiler
        self.address = address
        self.lastScannedBlock = lastScannedBlock
    }
}
