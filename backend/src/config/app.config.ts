export const appConfig = {
  port: process.env.PORT || 3001,
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:3000',
  ],
  apiPrefix: 'api',
};
