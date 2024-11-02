// src/redisClient.js
const redis = require('redis');
const config = require('./config');
const logger = require('./logger');

// Create Redis client
const client = redis.createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

// Handle connection events
client.on('error', (err) => logger.error('Redis Client Error', err));
client.on('connect', () => logger.info('Connected to Redis'));
client.on('ready', () => logger.info('Redis is ready to use'));

// Connect to Redis
(async () => {
  await client.connect();
})();

module.exports = client;
