//
//  File.swift
//  
//
//  Created by Qiwei Li on 6/14/22.
//

import Foundation
import Vapor
import Fluent
import BSON

final class Transaction: Model, Content {
    
    static let schema = "transactions"
    
    @ID(custom: "_id")
    var id: ObjectId?
    
    @Field(key: "hash")
    var hash: String
    
    @Field(key: "nonce")
    var nonce: HexString
    
    @Field(key: "blockHash")
    var blockHash: HexString
    
    @Field(key: "blockNumber")
    var blockNumber: HexString
    
    @Field(key: "transactionIndex")
    var transactionIndex: HexString
    
    @Field(key: "from")
    var from: HexString
    
    @Field(key: "to")
    var to: HexString
    
    @Field(key: "value")
    var value: HexString
    
    @Field(key: "gasPrice")
    var gasPrice: HexString
    
    @Field(key: "gas")
    var gas: HexString
    
    @Field(key: "maxPriorityFeePerGas")
    var maxPriorityFeeperGas: HexString?
    
    @Field(key: "maxFeePerGas")
    var maxFeePerGas: HexString?
    
    @Field(key: "input")
    var input: HexString?
  
}


