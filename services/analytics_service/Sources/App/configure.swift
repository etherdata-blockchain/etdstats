import Fluent
import FluentMongoDriver
import Vapor
import env
import common

// configures your application
public func configure(_ app: Application) throws {
    let corsConfiguration = CORSMiddleware.Configuration(
            allowedOrigin: .all, allowedMethods: [.GET, .POST, .PUT, .OPTIONS, .DELETE, .PATCH],
            allowedHeaders: [.accept, .authorization, .contentType, .origin, .xRequestedWith, .userAgent, .accessControlAllowOrigin]
    )
    let cors = CORSMiddleware(configuration: corsConfiguration)
    app.middleware.use(cors, at: .beginning)

    let checker = EnvChecker(envs: [ENVIRONMENT_DB_KEY])
    let checkResult = checker.check()

    if !checkResult.isNotMissing {
        app.logger.error("Missing keys: \(checkResult.missingKeys)")
        throw MissingKeyError.missingKey
    }


    try app.databases.use(.mongo(
            connectionString: Environment.get(ENVIRONMENT_DB_KEY)!
    ), as: .mongo)


    app.migrations.add(CreateAnalytics())

    // register routes
    try routes(app)

    try app.autoMigrate().wait()
}
