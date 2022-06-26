import BSON
import common
import Fluent
import Foundation
import Vapor

public final class Analytics: Model, Content {
    public static let schema = "analytics"

    @ID(custom: "_id")
    public var id: ObjectId?

    @Field(key: "mobile")
    public var mobile: Double

    @Field(key: "desktop")
    public var desktop: Double

    @Field(key: "total")
    public var total: Double

    public init () {

    }

    public init(mobile: Double, desktop: Double, total: Double) {
        self.mobile = mobile
        self.desktop = desktop
        self.total = total
    }

    /**
     Initialize analytics model
     */
    public static func initialize(database: Database) async  throws {
        // find if analytics model exists
        let analytics = try await Analytics.query(on: database).first()

        // if analytics model does not exist, create it
        if analytics == nil {
            let analytics = Analytics(mobile: 0, desktop: 0, total: 0)
            try await analytics.save(on: database)
        }
    }
}
