export interface HealthController {
  healthCheck(): Promise<{ reason?: string }>;
}
