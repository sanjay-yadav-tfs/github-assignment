const Bull = require('bull');
const { redisConfig } = require('../config/redis');
const logger = require('../utils/logger');

class QueueService {
  constructor() {
    this.isRedisAvailable = false;
    
    if (process.env.REDIS_ENABLED === 'false') {
      logger.info('Using mock queue service for development (Redis disabled)');
      this.setupMockQueues();
      return;
    }
    
    try {
      // Initialize queues
      this.approvalNotificationQueue = new Bull('approval notifications', {
        redis: redisConfig,
      });

      this.auditLogQueue = new Bull('audit logs', {
        redis: redisConfig,
      });

      this.emailQueue = new Bull('email notifications', {
        redis: redisConfig,
      });

      this.setupQueueProcessors();
      this.setupQueueEvents();
      this.isRedisAvailable = true;
    } catch (error) {
      logger.warn('Redis not available, using mock queue service for development');
      this.setupMockQueues();
    }
  }

  setupMockQueues() {
    // Mock queues for development without Redis
    this.approvalNotificationQueue = {
      add: async (jobName, data) => {
        logger.info(`Mock Queue - Approval notification: ${JSON.stringify(data)}`);
        await this.mockProcessApprovalNotification(data);
        return { id: Date.now() };
      }
    };

    this.auditLogQueue = {
      add: async (jobName, data) => {
        logger.info(`Mock Queue - Audit log: ${JSON.stringify(data)}`);
        await this.mockProcessAuditLog(data);
        return { id: Date.now() };
      }
    };

    this.emailQueue = {
      add: async (jobName, data) => {
        logger.info(`Mock Queue - Email: ${JSON.stringify(data)}`);
        await this.mockProcessEmail(data);
        return { id: Date.now() };
      }
    };
  }

  async mockProcessApprovalNotification(data) {
    const { userId, userEmail, userName, action, rejectionReason } = data;
    logger.info(`📧 Mock Email: User ${userName} (${userEmail}) has been ${action}`);
    if (rejectionReason) {
      logger.info(`📝 Rejection reason: ${rejectionReason}`);
    }
  }

  async mockProcessAuditLog(data) {
    const { action, userId, adminId, details } = data;
    logger.info(`📋 Mock Audit Log: Admin ${adminId} performed ${action} on user ${userId}`);
  }

  async mockProcessEmail(data) {
    const { to, subject, message } = data;
    logger.info(`📧 Mock Email sent to ${to}: ${subject}`);
  }

  setupQueueProcessors() {
    // Process approval notifications
    this.approvalNotificationQueue.process(async (job) => {
      const { userId, userEmail, userName, action, rejectionReason, adminId } = job.data;
      
      try {
        logger.info(`Processing approval notification for user: ${userEmail}, action: ${action}`);
        
        // Here you would typically send an email notification
        // For now, we'll just log it
        const message = action === 'approved' 
          ? `Congratulations ${userName}! Your account has been approved.`
          : `Hello ${userName}, your account has been rejected. Reason: ${rejectionReason}`;

        // Add email job to email queue
        await this.emailQueue.add('send notification email', {
          to: userEmail,
          subject: `Account ${action}`,
          message,
          userId,
          adminId,
        });

        // Add audit log job
        await this.auditLogQueue.add('user approval action', {
          action: `user_${action}`,
          userId,
          adminId,
          details: {
            userEmail,
            userName,
            rejectionReason: rejectionReason || null,
          },
          timestamp: new Date(),
        });

        logger.info(`Approval notification processed successfully for user: ${userEmail}`);
      } catch (error) {
        logger.error('Error processing approval notification:', error);
        throw error;
      }
    });

    // Process audit logs
    this.auditLogQueue.process(async (job) => {
      const { action, userId, adminId, details, timestamp } = job.data;
      
      try {
        logger.info(`Processing audit log: ${action} for user ID: ${userId}`);
        
        // Here you would typically save to an audit log table or external service
        // For now, we'll just log it
        const auditEntry = {
          action,
          userId,
          adminId,
          details,
          timestamp,
          id: Date.now(), // Simple ID for demo
        };

        logger.info('Audit entry created:', auditEntry);
      } catch (error) {
        logger.error('Error processing audit log:', error);
        throw error;
      }
    });

    // Process email notifications
    this.emailQueue.process(async (job) => {
      const { to, subject, message, userId, adminId } = job.data;
      
      try {
        logger.info(`Processing email notification to: ${to}`);
        
        // Here you would integrate with an email service like SendGrid, SES, etc.
        // For now, we'll simulate email sending
        await this.simulateEmailSending(to, subject, message);
        
        logger.info(`Email notification sent successfully to: ${to}`);
      } catch (error) {
        logger.error('Error processing email notification:', error);
        throw error;
      }
    });
  }

  setupQueueEvents() {
    // Setup event listeners for monitoring
    const queues = [this.approvalNotificationQueue, this.auditLogQueue, this.emailQueue];
    
    queues.forEach((queue) => {
      queue.on('completed', (job) => {
        logger.info(`Job completed: ${job.id} in queue: ${queue.name}`);
      });

      queue.on('failed', (job, err) => {
        logger.error(`Job failed: ${job.id} in queue: ${queue.name}`, err);
      });

      queue.on('stalled', (job) => {
        logger.warn(`Job stalled: ${job.id} in queue: ${queue.name}`);
      });
    });
  }

  async simulateEmailSending(to, subject, message) {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the "email" for demo purposes
    console.log('\n--- EMAIL NOTIFICATION ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('--- END EMAIL ---\n');
  }

  // Public methods to add jobs
  async addApprovalNotificationJob(data) {
    return await this.approvalNotificationQueue.add('approval notification', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  async addAuditLogJob(data) {
    return await this.auditLogQueue.add('audit log', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  async addEmailJob(data) {
    return await this.emailQueue.add('email notification', data, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  // Queue monitoring methods
  async getQueueStats() {
    const stats = {};
    const queues = {
      approvalNotifications: this.approvalNotificationQueue,
      auditLogs: this.auditLogQueue,
      emails: this.emailQueue,
    };

    for (const [name, queue] of Object.entries(queues)) {
      const [waiting, active, completed, failed] = await Promise.all([
        queue.getWaiting(),
        queue.getActive(),
        queue.getCompleted(),
        queue.getFailed(),
      ]);

      stats[name] = {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
      };
    }

    return stats;
  }
}

// Create singleton instance
const queueService = new QueueService();

module.exports = queueService;