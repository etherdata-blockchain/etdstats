// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "model",
    platforms: [
       .macOS(.v12),
       .iOS(.v13)
    ],
    products: [
        // Products define the executables and libraries a package produces, and make them visible to other packages.
        .library(
            name: "model",
            targets: ["model"]),
    ],
    dependencies: [
        .package(url: "https://github.com/vapor/vapor.git", from: "4.0.0"),
        .package(url: "https://github.com/vapor/fluent.git", from: "4.0.0"),
        .package(url: "https://github.com/OpenKitten/MongoKitten.git", from: "6.6.4"),
        .package(url: "https://github.com/Flight-School/AnyCodable", from: "0.6.0"),
        .package(path: "../common"),
    ],
    targets: [
        .target(
            name: "model",
            dependencies: [
                .product(name: "Vapor", package: "vapor"),
                .product(name: "Fluent", package: "fluent"),
                .product(name: "common", package: "common"),
                .product(name: "MongoKitten", package: "MongoKitten"),
                .product(name: "AnyCodable", package: "AnyCodable")
            ]
        ),
        .testTarget(
            name: "modelTests",
            dependencies: ["model"]),
    ]
)
