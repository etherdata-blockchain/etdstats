import axios from "axios";
import { AnalyticsService } from "openapi_client";
import { useQuery } from "react-query";

export function useAnalytics() {
  const result = useQuery("analytics", async () => {
    const analyticsService = new AnalyticsService({
      client: axios,
      baseUrl: process.env.NEXT_PUBLIC_ANALYTICS_API_ENDPOINT!,
    });
    const response = await analyticsService.analytics();
    return response;
  });

  return result;
}
