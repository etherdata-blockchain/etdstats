// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "clients",
    platforms: [
        .macOS(.v12),
    ],
    products: [
        // Products define the executables and libraries a package produces, and make them visible to other packages.
        .library(
            name: "clients",
            targets: ["clients"]),
    ],
    dependencies: [
        .package(url: "https://github.com/Alamofire/Alamofire", from: "5.0.0"),
        .package(url: "https://github.com/vapor/vapor.git", from: "4.0.0"),
        .package(path: "../../swift_packages/common"),
        .package(path: "../../swift_packages/model"),
        .package(path: "../../swift_packages/env"),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .target(
            name: "clients",
            dependencies: [
                .product(name: "common", package: "common"),
                .product(name: "model", package: "model"),
                .product(name: "env", package: "env"),
                .product(name: "Alamofire", package: "Alamofire")
            ]),
        .testTarget(
            name: "clientsTests",
            dependencies: ["clients"]),
    ]
)
