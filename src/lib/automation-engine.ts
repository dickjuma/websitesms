import { connectToDatabase } from "@/lib/database";
import { emailQueue } from "@/lib/email-queue";
import { ObjectId } from "mongodb";

// Automation execution engine
export class AutomationEngine {
  // Process subscription trigger
  async processSubscriptionTrigger(subscriberId: string, source: string) {
    try {
      const { db } = await connectToDatabase();

      // Find active automation rules for subscription trigger
      const rules = await db.collection("automation_rules").find({
        "trigger.type": "subscription",
        status: "active"
      }).toArray();

      for (const rule of rules) {
        await this.executeActions(rule, {
          subscriberId,
          triggerData: { source }
        });
      }
    } catch (error) {
      console.error("Process subscription trigger error:", error);
    }
  }

  // Process page visit trigger
  async processPageVisitTrigger(subscriberId: string, pageUrl: string) {
    try {
      const { db } = await connectToDatabase();

      // Find active automation rules for page visit trigger
      const rules = await db.collection("automation_rules").find({
        "trigger.type": "page_visit",
        status: "active"
      }).toArray();

      for (const rule of rules) {
        const conditions = rule.trigger.conditions || {};

        // Check if page matches trigger conditions
        if (conditions.source && pageUrl.includes(conditions.source)) {
          await this.executeActions(rule, {
            subscriberId,
            triggerData: { pageUrl }
          });
        }
      }
    } catch (error) {
      console.error("Process page visit trigger error:", error);
    }
  }

  // Process email interaction triggers
  async processEmailTrigger(subscriberId: string, action: 'open' | 'click', emailData: any) {
    try {
      const { db } = await connectToDatabase();

      const triggerType = action === 'open' ? 'email_open' : 'email_click';

      // Find active automation rules for email triggers
      const rules = await db.collection("automation_rules").find({
        "trigger.type": triggerType,
        status: "active"
      }).toArray();

      for (const rule of rules) {
        await this.executeActions(rule, {
          subscriberId,
          triggerData: { emailData, action }
        });
      }
    } catch (error) {
      console.error("Process email trigger error:", error);
    }
  }

  // Process inactivity trigger (run via cron job)
  async processInactivityTrigger() {
    try {
      const { db } = await connectToDatabase();

      // Find active inactivity rules
      const rules = await db.collection("automation_rules").find({
        "trigger.type": "inactive",
        status: "active"
      }).toArray();

      for (const rule of rules) {
        const conditions = rule.trigger.conditions || {};
        const daysInactive = (conditions.timeDelay || 604800) / 86400; // Convert seconds to days

        // Find subscribers inactive for specified period
        const inactiveDate = new Date();
        inactiveDate.setDate(inactiveDate.getDate() - daysInactive);

        const inactiveSubscribers = await db.collection("subscribers").find({
          subscriptionStatus: "active",
          lastActivityAt: { $lt: inactiveDate }
        }).toArray();

        for (const subscriber of inactiveSubscribers) {
          await this.executeActions(rule, {
            subscriberId: subscriber._id.toString(),
            triggerData: { daysInactive, lastActivity: subscriber.lastActivityAt }
          });
        }
      }
    } catch (error) {
      console.error("Process inactivity trigger error:", error);
    }
  }

  // Execute automation actions
  private async executeActions(rule: any, context: {
    subscriberId: string;
    triggerData: any;
  }) {
    try {
      const { db } = await connectToDatabase();

      // Update rule stats
      await db.collection("automation_rules").updateOne(
        { _id: rule._id },
        { $inc: { "stats.triggeredCount": 1 } }
      );

      // Execute each action
      for (const action of rule.actions) {
        await this.executeAction(action, context);

        // Update completed stats
        await db.collection("automation_rules").updateOne(
          { _id: rule._id },
          { $inc: { "stats.completedCount": 1 } }
        );
      }
    } catch (error) {
      console.error("Execute actions error:", error);

      // Update failed stats
      const { db } = await connectToDatabase();
      await db.collection("automation_rules").updateOne(
        { _id: rule._id },
        { $inc: { "stats.failedCount": 1 } }
      );
    }
  }

  // Execute individual action
  private async executeAction(action: any, context: {
    subscriberId: string;
    triggerData: any;
  }) {
    const { db } = await connectToDatabase();

    switch (action.type) {
      case 'send_email':
        await this.executeSendEmailAction(action, context);
        break;

      case 'add_tag':
        await this.executeTagAction(action, context, 'add');
        break;

      case 'remove_tag':
        await this.executeTagAction(action, context, 'remove');
        break;

      case 'update_segment':
        await this.executeSegmentAction(action, context);
        break;

      case 'webhook':
        await this.executeWebhookAction(action, context);
        break;

      default:
        console.warn(`Unknown action type: ${action.type}`);
    }
  }

  // Send email action
  private async executeSendEmailAction(action: any, context: {
    subscriberId: string;
    triggerData: any;
  }) {
    try {
      const { db } = await connectToDatabase();

      // Get subscriber details
      const subscriber = await db.collection("subscribers").findOne({
        _id: new ObjectId(context.subscriberId)
      });

      if (!subscriber) return;

      // Get campaign/template details
      let campaignData: any = null;

      if (action.config.campaignId) {
        campaignData = await db.collection("campaigns").findOne({
          _id: new ObjectId(action.config.campaignId)
        });
      } else if (action.config.templateId) {
        // For template-based emails, create campaign on-the-fly
        campaignData = {
          name: `Automation: ${action.config.templateId}`,
          subject: "Automated Email",
          content: {
            html: `<p>This is an automated email for ${subscriber.name || 'valued subscriber'}.</p>`,
            text: "This is an automated email."
          },
          sender: {
            name: "SMAS Systems",
            email: "hello@smassystems.com"
          },
          tracking: {
            trackOpens: true,
            trackClicks: true,
            trackUnsubscribes: true
          }
        };
      }

      if (campaignData) {
        // Add to email queue
        emailQueue.addJob({
          campaignId: action.config.campaignId || 'automation',
          subscriberId: context.subscriberId,
          email: subscriber.email,
          subject: campaignData.subject,
          htmlContent: campaignData.content.html,
          textContent: campaignData.content.text,
          sender: campaignData.sender,
          tracking: campaignData.tracking,
          priority: 1, // Lower priority for automation emails
          maxRetries: 3
        });
      }
    } catch (error) {
      console.error("Execute send email action error:", error);
      throw error;
    }
  }

  // Tag management actions
  private async executeTagAction(action: any, context: {
    subscriberId: string;
    triggerData: any;
  }, operation: 'add' | 'remove') {
    try {
      const { db } = await connectToDatabase();

      const updateOperation = operation === 'add'
        ? { $addToSet: { tags: { $each: action.config.tags } } }
        : { $pull: { tags: { $in: action.config.tags } } };

      await db.collection("subscribers").updateOne(
        { _id: new ObjectId(context.subscriberId) },
        updateOperation
      );
    } catch (error) {
      console.error(`Execute ${operation} tag action error:`, error);
      throw error;
    }
  }

  // Segment update action
  private async executeSegmentAction(action: any, context: {
    subscriberId: string;
    triggerData: any;
  }) {
    try {
      const { db } = await connectToDatabase();

      await db.collection("subscribers").updateOne(
        { _id: new ObjectId(context.subscriberId) },
        { $addToSet: { segments: action.config.segment } }
      );
    } catch (error) {
      console.error("Execute segment action error:", error);
      throw error;
    }
  }

  // Webhook action
  private async executeWebhookAction(action: any, context: {
    subscriberId: string;
    triggerData: any;
  }) {
    try {
      const payload = {
        subscriberId: context.subscriberId,
        triggerData: context.triggerData,
        timestamp: new Date().toISOString(),
        source: 'automation_engine'
      };

      await fetch(action.config.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Execute webhook action error:", error);
      // Don't throw error for webhook failures to avoid breaking automation
    }
  }
}

// Export singleton instance
export const automationEngine = new AutomationEngine();