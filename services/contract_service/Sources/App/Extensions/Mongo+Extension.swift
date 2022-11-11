//
//  File.swift
//  
//
//  Created by Qiwei Li on 11/12/22.
//

import MongoCore
import MongoKitten
import NIO

extension MongoCollection {
    var pool: MongoConnectionPool {
        self.database.pool
    }
    
    
    @discardableResult
    public func insertMany(_ documents: [Document], writeConcern: WriteConcern? = nil, ordered: Bool) -> EventLoopFuture<InsertReply> {
           return pool.next(for: .init(writable: true)).flatMap { connection in
               var command = InsertCommand(documents: documents, inCollection: self.name)
               command.writeConcern = writeConcern
               command.ordered = ordered
               return connection.executeCodable(command, namespace:  self.database.commandNamespace, sessionId: self.sessionId ?? connection.implicitSessionId)
           }.decodeReply(InsertReply.self).flatMapThrowing { reply in
               if reply.ok == 1 {
                   return reply
               }

               self.pool.logger.error("MongoDB Insert operation failed")
               throw reply
           }
       }
    
}
