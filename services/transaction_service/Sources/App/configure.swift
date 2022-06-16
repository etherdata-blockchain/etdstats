import Fluent
import FluentMongoDriver
import Vapor
import common

// configures your application
public func configure(_ app: Application) throws {
    // uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
    guard let DB_URL = Environment.get(ENVIRONMENT_DB_KEY) else {
        print("Missing \(ENVIRONMENT_RPC_URL_KEY)")
        throw MissingKeyError.missingKey
    }
    
    guard let _ = Environment.get(ENVIRONMENT_RPC_URL_KEY) else {
        print("Missing \(ENVIRONMENT_RPC_URL_KEY)")
        throw MissingKeyError.missingKey
    }
    
    
    try app.databases.use(.mongo(
        connectionString: DB_URL
    ), as: .mongo)

    
    // register routes
    try routes(app)
}
