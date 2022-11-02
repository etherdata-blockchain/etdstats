//
//  File.swift
//  
//
//  Created by Qiwei Li on 11/2/22.
//

import Foundation
import JWT

public struct WalletAuthenticationPayload: JWTPayload {
    // Maps the longer Swift property names to the
    // shortened keys used in the JWT payload.
    enum CodingKeys: String, CodingKey {
        case expiration = "exp"
        case userId = "userId"
    }
    
    var expiration: ExpirationClaim
    
    /**
     User's verified address
     */
    var userId: String
    

    public func verify(using signer: JWTSigner) throws {
        try self.expiration.verifyNotExpired()
    }
}
