import React, { createContext, useEffect } from "react";
import { AnalyticsResponse, AnalyticsService } from "openapi_client";
import axios from "axios";

interface Context {
  analytics?: AnalyticsResponse;
}

//@ts-ignore
export const AnalyticsContext = createContext<Context>({});

export function AnalyticsContextProvider(props: any) {
  const [analytics, setAnalytics] = React.useState<AnalyticsResponse>();

  useEffect(() => {
    const fetchAnalytics = async () => {
      console.log(process.env.NEXT_PUBLIC_ANALYTICS_API_ENDPOINT);
      const analyticsService = new AnalyticsService({
        client: axios,
        baseUrl: process.env.NEXT_PUBLIC_ANALYTICS_API_ENDPOINT!,
      });
      const response = await analyticsService.analytics();
      setAnalytics(response);
    };
    fetchAnalytics();
  }, []);

  const value: Context = {
    analytics: analytics,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {props.children}
    </AnalyticsContext.Provider>
  );
}
