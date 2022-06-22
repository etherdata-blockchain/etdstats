import Fluent
import FluentMongoDriver
import Vapor
import common
import env
import Redis

// configures your application
public func configure(_ app: Application) throws {
    // uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    let checker = EnvChecker(envs: [ENVIRONMENT_DB_KEY, ENVIRONMENT_RPC_URL_KEY, ENVIRONMENT_REDIS_KEY])
    let checkResult = checker.check()

    if !checkResult.isNotMissing {
        app.logger.error("Missing keys: \(checkResult.missingKeys)")
        throw MissingKeyError.missingKey
    }
    
    
    try app.databases.use(.mongo(
        connectionString: Environment.get(ENVIRONMENT_DB_KEY)!
    ), as: .mongo)

    // config redis
    app.redis.configuration = try RedisConfiguration(url:  URL(string:  Environment.get(ENVIRONMENT_REDIS_KEY)!)!)
    
    // register routes
    try routes(app)
}
