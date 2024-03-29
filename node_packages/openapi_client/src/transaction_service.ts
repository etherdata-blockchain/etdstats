import { Client } from "./client";
import { UserInfo } from "./user_service";

export interface PaginationParameter {
  /**
   * Current page number. Only works on user info
   */
  page?: number;
  /**
   * Number of items per page. Only works on user info
   */
  per?: number;
}

export type TransactionResponse = BlockResult | TransactionResult | UserResult;

export interface Transaction {
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
  block: Block;
  timestamp: string;
  fromUserInfo?: UserInfo;
  toUserInfo?: UserInfo;
}

export interface TransactionResult {
  type: "transaction";
  data: Transaction;
}

export interface Block {
  size: number;
  totalDifficulty: number;
  uncles: string[];
  transactions: Transaction[];
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
  numberInBase10: number;
  minerInfo: UserInfo;
}

export interface BlockResult {
  type: "block";
  data: Block;
}

export interface UserResult {
  type: "user";
  data: {
    balance: string;
    totalTransactionsSent: number;
    totalTransactionsReceived: number;
    totalTransactions: number;
    itemsPerPage: number;
    transactions: Transaction[];
    userInfo?: UserInfo;
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
    params?: PaginationParameter
  ): Promise<TransactionResponse> {
    const useParams = !Number.isNaN(params?.page) && params?.page !== undefined;
    let response = await this.client.get(`${this.baseUrl}/${id}`, {
      params: useParams ? { page: params.page } : undefined,
    });
    return response.data;
  }
}
