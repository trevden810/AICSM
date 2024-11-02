const config = {
  db: {
    name: 'aicsm',               // Your database name
    user: 'postgres',            // Username you set up for PostgreSQL
    password: 'mayhemannie1977',    // The new PostgreSQL password you set
    host: 'localhost',           // Running locally
    port: 5432                   // Default PostgreSQL port
  },
  redis: {
    host: 'localhost',           // Redis hostname
    port: 6379                   // Default Redis port
  },
  app: {
    port: 3000,                  // Port where your app will run
    environment: 'development'   // Your environment setting
  }
};
module.exports = config;
