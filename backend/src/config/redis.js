const redis = require('redis');
require('dotenv').config();

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
};

// Create Redis client
const client = redis.createClient({
  socket: {
    host: redisConfig.host,
    port: redisConfig.port,
  },
  password: redisConfig.password,
});

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

client.on('connect', () => {
  console.log('🟡 Redis Client Connected');
});

client.on('ready', () => {
  console.log('✅ Redis Client Ready');
});

const connectRedis = async () => {
  if (process.env.REDIS_ENABLED === 'false') {
    console.log('📝 Redis disabled for development mode');
    return;
  }
  
  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error.message);
    console.log('📝 Note: Redis is optional for development. Queue features will be disabled.');
  }
};

module.exports = {
  client,
  connectRedis,
  redisConfig,
};