import process from 'process';

export const HEALTH_SERVICE_URL =
  process.env.HEALTH_SERVICE_URL || 'localhost:5000';

export const TRANSACTION_SERVICE_URL =
  process.env.TRANSACTION_SERVICE_URL || 'localhost:5001';
