module.exports = {
  apps: [
    {
      name: "enkaj-manager",
      script: "node_modules/next/dist/bin/next", // Path to the Next.js binary
      args: "start",
      instances: -1,
      exec_mode: "cluster",
      watch: false,
      autorestart: true,
      max_memory_restart: "1G",
      // max_cpu_restart: 50, // Set the maximum CPU usage percentage to 50%.
      // restart_delay: 5000, // Delay between restart attempts
      env: {
        PORT: 3002,
        NODE_ENV: "production",
      },
      env_production: {
        PORT: 3002,
        NODE_ENV: "production",
      },
    },
  ],
};
