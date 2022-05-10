export interface TransactionController {
  healthCheck(): Promise<{ reason?: string }>;
}
