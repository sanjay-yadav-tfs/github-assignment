const logger = require('../utils/logger');
const QueueService = require('../services/QueueService');
const { connectRedis } = require('../config/redis');

class Worker {
  constructor() {
    this.isRunning = false;
  }

  async start() {
    try {
      if (this.isRunning) {
        logger.warn('Worker is already running');
        return;
      }

      logger.info('Starting background worker...');
      
      // Connect to Redis
      await connectRedis();
      
      this.isRunning = true;
      
      // Worker is now ready to process jobs through QueueService
      logger.info('✅ Background worker started successfully');
      
      // Setup graceful shutdown
      this.setupGracefulShutdown();
      
    } catch (error) {
      logger.error('Failed to start worker:', error);
      throw error;
    }
  }

  async stop() {
    try {
      if (!this.isRunning) {
        logger.warn('Worker is not running');
        return;
      }

      logger.info('Stopping background worker...');
      
      this.isRunning = false;
      
      logger.info('✅ Background worker stopped successfully');
    } catch (error) {
      logger.error('Failed to stop worker:', error);
      throw error;
    }
  }

  setupGracefulShutdown() {
    const gracefulShutdown = async (signal) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);
      
      try {
        await this.stop();
        process.exit(0);
      } catch (error) {
        logger.error('Error during graceful shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  }

  // Method to add custom job processors
  addJobProcessor(queueName, jobName, processor) {
    try {
      const queue = QueueService[queueName];
      if (queue) {
        queue.process(jobName, processor);
        logger.info(`Added custom job processor: ${queueName}.${jobName}`);
      } else {
        logger.error(`Queue not found: ${queueName}`);
      }
    } catch (error) {
      logger.error('Failed to add job processor:', error);
    }
  }
}

// If this file is run directly, start the worker
if (require.main === module) {
  const worker = new Worker();
  
  worker.start().catch((error) => {
    logger.error('Failed to start worker:', error);
    process.exit(1);
  });
}

module.exports = Worker;