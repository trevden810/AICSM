// src/db.js
const { Pool } = require('pg');
const config = require('./config');
const logger = require('./logger');

// Create a new pool instance
const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
});

// Test the connection immediately upon setup
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    logger.info('PostgreSQL connected successfully at:', result.rows[0].now);
  } catch (error) {
    logger.error('Error acquiring client', error.stack);
    // Optional retry logic
    setTimeout(() => {
      logger.info('Retrying database connection...');
      testConnection();
    }, 5000); // Retry after 5 seconds
  }
};

testConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
