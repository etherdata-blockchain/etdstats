import Fluent
import Vapor
import model
import common
import Redis

struct UserController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        routes.get("stats", "user", ":id", use: get)
    }


    func get(req: Request) async throws  -> UserInfoModel {
        let databaseClient = DatabaseClient(database: req.db, cache: req.redis)
        guard let id = req.parameters.get("id") else {
            throw InvalidHashError.missingID
        }

        guard let hexId = try? HexString(id) else{
            throw InvalidHashError.invalidFormat
        }

//        let redisKey = RedisKey("user-info-\(id)")
//        if let user = try await req.redis.get(redisKey, asJSON: UserInfoModel.self) {
//            return user
//        }

        let client = ServerClient(db: databaseClient)
        let result =  try await client.userinfo(id: hexId)
        if let result = result {
//            try await databaseClient.cache.set(redisKey, toJSON: result)
//            let _ = databaseClient.cache.expire(redisKey, after: .minutes(1))
            return result
        } else {
           throw Abort(.notFound)
        }
    }

}
