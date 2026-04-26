// Email sending queue system
// In production, replace with Redis + BullMQ for scalability

interface EmailJob {
  id: string;
  campaignId: string;
  subscriberId: string;
  email: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  sender: {
    name: string;
    email: string;
  };
  tracking: {
    trackOpens: boolean;
    trackClicks: boolean;
  };
  priority: number;
  retryCount: number;
  maxRetries: number;
  createdAt: Date;
  nextSendAt?: Date;
}

class EmailQueue {
  private queue: EmailJob[] = [];
  private processing = false;
  private batchSize = 10; // Send 10 emails at a time
  private delayBetweenBatches = 1000; // 1 second between batches

  // Email service configuration
  private emailService = {
    provider: process.env.EMAIL_PROVIDER || 'nodemailer', // 'sendgrid' | 'ses' | 'nodemailer'
    apiKey: process.env.EMAIL_API_KEY,
    fromEmail: process.env.EMAIL_FROM || 'hello@smassystems.com',
    fromName: process.env.EMAIL_FROM_NAME || 'SMAS Systems'
  };

  addJob(job: Omit<EmailJob, 'id' | 'createdAt'>): string {
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullJob: EmailJob = {
      ...job,
      id: jobId,
      createdAt: new Date()
    };

    this.queue.push(fullJob);
    this.processQueue();

    return jobId;
  }

  addBulkJobs(jobs: Omit<EmailJob, 'id' | 'createdAt'>[]): string[] {
    const jobIds: string[] = [];

    jobs.forEach(job => {
      const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fullJob: EmailJob = {
        ...job,
        id: jobId,
        createdAt: new Date()
      };

      this.queue.push(fullJob);
      jobIds.push(jobId);
    });

    this.processQueue();
    return jobIds;
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    try {
      // Sort by priority and creation time
      this.queue.sort((a, b) => {
        if (a.priority !== b.priority) return b.priority - a.priority;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });

      // Process in batches
      while (this.queue.length > 0) {
        const batch = this.queue.splice(0, this.batchSize);

        // Process batch
        await Promise.allSettled(
          batch.map(job => this.sendEmail(job))
        );

        // Delay between batches to avoid rate limits
        if (this.queue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, this.delayBetweenBatches));
        }
      }
    } finally {
      this.processing = false;
    }
  }

  private async sendEmail(job: EmailJob): Promise<void> {
    try {
      // Add tracking pixels and links if enabled
      let htmlContent = job.htmlContent;
      let textContent = job.textContent;

      if (job.tracking.trackOpens) {
        // Add open tracking pixel
        const trackingPixel = `<img src="${process.env.NEXT_PUBLIC_APP_URL}/api/email/track/open/${job.id}" width="1" height="1" style="display:none;" />`;
        htmlContent += trackingPixel;
      }

      if (job.tracking.trackClicks) {
        // Wrap links with tracking (simplified)
        // In production, use a proper link tracking system
        htmlContent = htmlContent.replace(
          /href="([^"]+)"/g,
          `href="${process.env.NEXT_PUBLIC_APP_URL}/api/email/track/click/${job.id}?url=$1"`
        );
      }

      // Send email based on provider
      await this.sendViaProvider({
        to: job.email,
        subject: job.subject,
        html: htmlContent,
        text: textContent,
        from: `${job.sender.name} <${job.sender.email}>`
      });

      // Log successful send
      console.log(`Email sent successfully: ${job.id} to ${job.email}`);

    } catch (error) {
      console.error(`Email send failed: ${job.id}`, error);

      // Retry logic
      if (job.retryCount < job.maxRetries) {
        job.retryCount++;
        job.nextSendAt = new Date(Date.now() + (job.retryCount * 60000)); // Exponential backoff
        this.queue.push(job);
      }
    }
  }

  private async sendViaProvider(options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
    from: string;
  }) {
    switch (this.emailService.provider) {
      case 'sendgrid':
        return this.sendViaSendGrid(options);

      case 'ses':
        return this.sendViaSES(options);

      case 'nodemailer':
      default:
        return this.sendViaNodemailer(options);
    }
  }

  private async sendViaSendGrid(options: any) {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.emailService.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: options.to }]
        }],
        from: { email: options.from.split('<')[1]?.replace('>', '') || this.emailService.fromEmail },
        subject: options.subject,
        content: [
          { type: 'text/html', value: options.html }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`SendGrid error: ${response.statusText}`);
    }
  }

  private async sendViaSES(options: any) {
    // AWS SES implementation would go here
    // For now, fallback to nodemailer
    return this.sendViaNodemailer(options);
  }

  private async sendViaNodemailer(options: any) {
    // For development/demo purposes
    // In production, configure proper SMTP
    console.log('Sending email via nodemailer:', {
      to: options.to,
      subject: options.subject,
      from: options.from
    });

    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
  }

  getQueueStatus() {
    return {
      queued: this.queue.length,
      processing: this.processing,
      batchSize: this.batchSize
    };
  }

  clearQueue() {
    this.queue = [];
  }
}

// Export singleton instance
export const emailQueue = new EmailQueue();