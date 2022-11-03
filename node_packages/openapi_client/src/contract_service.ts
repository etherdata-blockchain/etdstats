import { Client } from "./client";

export interface Contract {
  name: string;
  source: string;
  abi: string;
  bytecode: string;
  address: string;
  lastScannedBlock: number;
  creator: string;
  transactionHash: string;
  blockHash: string;
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

  async getContract(address: string): Promise<Contract> {
    let response = await this.client.get(`${this.baseUrl}/contract/${address}`);
    return response.data;
  }

  async searchContracts(query: string, token: string): Promise<Contract[]> {
    let response = await this.client.get(
      `${this.baseUrl}/contract/search?keyword=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  async updateContract(contract: Contract, token: string): Promise<Contract> {
    let response = await this.client.patch(
      `${this.baseUrl}/contract/${contract.address}`,
      contract,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
}
