import BSON
import common
import Fluent
import Foundation
import Vapor


public final class UserInfoModel: Model {
    public init() {
    }

    public static let schema = "users"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Field(key: "address")
    public var address: HexString

    @Field(key: "username")
    public var username: String

    public init(id: ObjectId?, username: String, address: HexString) {
        self.id = id
        self.username = username
        self.address = address
    }
}
