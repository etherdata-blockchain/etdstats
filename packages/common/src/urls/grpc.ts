import process from 'process';

export const HEALTH_SERVICE_URL =
  process.env.HEALTH_SERVICE_URL || 'localhost:3001';

export const TRANSACTION_SERVICE_URL =
  process.env.TRANSACTION_SERVICE_URL || 'localhost:3002';
