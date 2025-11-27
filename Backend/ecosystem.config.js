module.exports = {
  apps: [
    {
      name: 'smenterprises-api',       // App name in PM2
      script: './index.js',            // Entry point of your backend
      interpreter: 'node',             // Force Node interpreter
      cwd: '/root/SM-Enterprises/Backend', // Working directory
      watch: false,                    // Disable file watching in production
      env: {
        NODE_ENV: 'production'         // Environment variables
      }
    }
  ]
};
