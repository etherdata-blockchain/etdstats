export interface TransactionInterface {
  hash: string;
  nonce: string;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gas: number;
  input: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
}
