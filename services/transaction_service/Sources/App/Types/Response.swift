//
//  File.swift
//  
//
//  Created by Qiwei Li on 6/15/22.
//

import Foundation
import Vapor



struct QueryResponse: Content{
    var type: DataType
    var data: Any
    
    private enum CodingKeys: String, CodingKey { case type, data }
    
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        type = try container.decode(DataType.self, forKey: .type)
   
        if let data = try? container.decode(Transaction.self, forKey: .data) {
            self.data = data
        }
        
        if let data = try? container.decode(Block.self, forKey: .data) {
            self.data = data
        }
        
        throw InvalidTypeError.invalidRequestType
    }
    
    init(type: DataType, data: Any){
        self.type = type
        self.data = data
    }
    
    func encode(to encoder: Encoder) throws {
        var container = try encoder.container(keyedBy: CodingKeys.self)
        try container.encode(type, forKey: .type)
        if let data = data as? Transaction {
            try container.encode(data, forKey: .data)
        }
        
        if let data = data as? Block {
            try container.encode(data, forKey: .data)
        }
    }
}

enum DataType: String, Codable {
    case transaction = "transaction"
    case block = "block"
    case user = "user"
}

extension QueryResponse {
    static func fromData(transactionData: Transaction?, blockData: Block?, userData: User?) throws -> QueryResponse{
        if let transactionData = transactionData {
            return QueryResponse(type: .transaction, data: transactionData)
        }

        if let blockData = blockData {
            return QueryResponse(type: .block, data: blockData)
        }
        
        if let userData = userData {
            return QueryResponse(type: .user, data: userData)
        }
        
        throw InvalidHashError.hashNotFound
    }
}
