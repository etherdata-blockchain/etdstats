import { Client } from "./client";
import {
  BlockResult,
  PaginationParameter,
  Transaction,
  TransactionResult,
  Block,
} from "./transaction_service";
import { UserInfo } from "./user_service";

export interface BlockInfoResponse {
  numBlocks: number;
  numTransactions: number;
  block: BlockResult;
  blockTimeChangePercentage: "string";
  difficultyChangePercentage: "string";
  blockTimeHistory: string[];
  difficultyHistory: string[];
  chainId: string;
  rpc: string;
  numUncles: number;
}

export interface PaginationResponse<T> {
  metadata: {
    total: number;
    per: number;
    page: number;
  };
  items: T[];
}

export class BlockInfoService extends Client {
  /**
   * Get block info
   * @returns
   */
  public async info(): Promise<BlockInfoResponse> {
    let response = await this.client.get(`${this.baseUrl}`);
    return response.data;
  }

  /**
   * Get list of blocks
   */
  public async blocks(
    params: PaginationParameter
  ): Promise<PaginationResponse<Block>> {
    let response = await this.client.get(`${this.baseUrl}/blocks`, { params });
    return response.data;
  }

  public async transactions(
    params: PaginationParameter
  ): Promise<PaginationResponse<Transaction>> {
    let response = await this.client.get(`${this.baseUrl}/transactions`, {
      params,
    });
    return response.data;
  }
}
