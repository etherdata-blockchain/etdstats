import { Client } from "./client";

export interface Contract {
  source: string;
  abi: string;
  bytecode: string;
  address: string;
  lastScannedBlock: number;
}

export interface Pagination<T> {
  items: T[];
  metadata: {
    total: number;
    per: number;
    page: number;
  };
}

export class ContractService extends Client {
  async listContracts(page: number = 1): Promise<Pagination<Contract>> {
    let response = await this.client.get(
      `${this.baseUrl}/contract?page=${page}`
    );
    return response.data;
  }
}
