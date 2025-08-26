module.exports = {
  apps: [
    {
      name: "enkaj-api",
      script: "./dist/index.js", // coz I'll 1st have to run 'npm run build' first
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
