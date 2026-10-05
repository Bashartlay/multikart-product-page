module.exports = {
  apps: [
    {
      name: 'multikart-product-page',
      cwd: '/var/www/multikart-product-page',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --hostname 127.0.0.1 --port 3020',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: '3020',
        HOSTNAME: '127.0.0.1',
      },
    },
  ],
}
