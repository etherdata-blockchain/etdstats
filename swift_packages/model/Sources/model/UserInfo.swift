import BSON
import common
import Fluent
import Foundation
import Vapor


public final class UserInfoModel: Model, Content {
    public init() {
    }

    public static let schema = "users"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Field(key: "address")
    public var address: HexString

    @Field(key: "username")
    public var username: String

    @Field(key: "avatar")
    public var avatar: String

    @Field(key: "description")
    public var description: String

    public init(id: ObjectId?, address: HexString, username: String, avatar: String, description: String) {
        self.id = id
        self.address = address
        self.username = username
        self.avatar = avatar
        self.description = description
    }
}
