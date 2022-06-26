import { Client } from "./client";

export interface AnalyticsResponse {
  mobile: number;
  desktop: number;
  total: number;
}

export class AnalyticsService extends Client {
  /**
   * Get any one of the following details by id: Transaction, block, or user
   * @param id Hex string representation of one of the following: Transaction ID, block ID, or user wallet address
   * @param params
   * @returns
   */
  public async analytics(): Promise<AnalyticsResponse> {
    let response = await this.client.post(`${this.baseUrl}`);
    return response.data;
  }
}
