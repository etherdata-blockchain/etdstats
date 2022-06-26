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
  public async analytics(userAgent?: string): Promise<AnalyticsResponse> {
    // set user agent if provided
    let response = await this.client.post(`${this.baseUrl}`, {
      headers: {
        "User-Agent": userAgent,
      },
    });
    return response.data;
  }
}
