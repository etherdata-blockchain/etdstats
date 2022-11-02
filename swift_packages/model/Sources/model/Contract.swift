import AnyCodable
import BSON
import Fluent
import Foundation
import Vapor

public protocol ContractProtocol: Content {
    var source: String { get set }

    var bytecode: String { get set }

    var compiler: String { get set }

    var address: String { get set }

    var lastScannedBlock: Int { get set }
}

public final class CreateContractDto: Model, ContractProtocol {
    public static let schema = "contracts"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Field(key: "source")
    public var source: String

    @Field(key: "abi")
    public var abi: AnyCodable

    @Field(key: "bytecode")
    public var bytecode: String

    @Field(key: "compiler")
    public var compiler: String

    @Field(key: "address")
    public var address: String

    @Field(key: "lastScannedBlock")
    public var lastScannedBlock: Int

    public init() {}

    init(id: ObjectId? = nil, source: String, abi: AnyCodable, bytecode: String, compiler: String, address: String, lastScannedBlock: Int) {
        self.id = id
        self.source = source
        self.abi = abi
        self.bytecode = bytecode
        self.compiler = compiler
        self.address = address
        self.lastScannedBlock = lastScannedBlock
    }
}

public final class Contract: Model, ContractProtocol {
    public static let schema = "contracts"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Field(key: "source")
    public var source: String

    @Field(key: "abi")
    public var abi: Document

    @Field(key: "bytecode")
    public var bytecode: String

    @Field(key: "compiler")
    public var compiler: String

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
