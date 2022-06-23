import { Client } from "./client";

interface QueryParameter1 {
  /**
   * Current page number. Only works on user info
   */
  page: number;
  /**
   * Number of items per page. Only works on user info
   */
  per: number;
}

export type TransactionResponse = BlockResult | TransactionResult | UserResult;

interface Transaction {
  hash: string;
  nonce: number;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: number;
  gas: number;
  input: string;
}

export interface TransactionResult {
  type: "transaction";
  data: Transaction;
}

export interface BlockResult {
  type: "block";
  data: {
    size: number;
    difficulty: number;
    uncles: string[];
    transactions: string[];
    number: string;
    hash: string;
    parentHash: string;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionsRoot: string;
    stateRoot: string;
    receiptsRoot: string;
    miner: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    timestamp: string;
  };
}

export interface UserResult {
  type: "user";
  data: {
    balance: string;
    transactions: Transaction[];
  };
}

export class TransactionService extends Client {
  /**
   * Get any one of the following details by id: Transaction, block, or user
   * @param id Hex string representation of one of the following: Transaction ID, block ID, or user wallet address
   * @param params
   * @returns
   */
  public async fetchDetailsById(
    id: string,
    params?: QueryParameter1
  ): Promise<TransactionResponse> {
    let response = await this.client.get(`${this.baseUrl}/${id}`, { params });
    return response.data;
  }
}
