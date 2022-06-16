//
//  File.swift
//
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor

struct User: Content {
   var balance: String
   var transaction: [Transaction]
}
