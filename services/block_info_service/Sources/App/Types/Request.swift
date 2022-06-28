//
// Created by Qiwei Li on 6/28/22.
//

import Foundation
import Vapor
import common


struct ChainIDRequest: Content {
    var jsonrpc: String = "2.0"
    var method: String = "eth_chainId"
    var params: [HexString]
    var id: String = "abcde"
}