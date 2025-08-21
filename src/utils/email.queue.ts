import { EventEmitter } from 'events';
import EmailService from "../services/email.service";

interface EmailJob {
    id: string;
    type: 'leave-status';
    data: {
        maNghiPhep: number;
        ngayNghiData: any;
    };
    timestamp: Date;
}

class EmailQueue extends EventEmitter {
    private readonly jobs: EmailJob[] = [];
    private processing = false;

    constructor() {
        super();
        this.startProcessor();
        console.log('[EmailQueue] Background email queue initialized');
    }

    /**
     * Add email job to queue
     */
    addJob(type: string, data: any): void {
        const job: EmailJob = {
            id: `job_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
            type: type as any,
            data,
            timestamp: new Date()
        };

        this.jobs.push(job);
        console.log(`[EmailQueue] Email job queued: ${job.id}`);

        // Emit event to wake up processor if it's idle
        this.emit('newJob');
    }

    /**
     * Start background processor
     */
    private startProcessor() {
        this.on('newJob', () => {
            if (!this.processing && this.jobs.length > 0) {
                this.processJobs();
            }
        });

        // Process jobs every 10 seconds if there are any pending
        setInterval(() => {
            if (!this.processing && this.jobs.length > 0) {
                this.processJobs();
            }
        }, 10000);
    }

    /**
     * Process jobs in background
     */
    private async processJobs() {
        if (this.processing || this.jobs.length === 0) return;

        this.processing = true;

        while (this.jobs.length > 0) {
            const job = this.jobs.shift();
            if (!job) continue;

            try {
                await this.processJob(job);
                console.log(`[EmailQueue] Email sent successfully: ${job.id}`);
            } catch (error) {
                console.error(`[EmailQueue] Failed to send email: ${job.id}`, error);
            }
        }

        this.processing = false;
    }

    /**
     * Process an individual job
     */
    private async processJob(job: EmailJob) {
        // Import services here to avoid circular dependencies
        const { container } = await import('../configs/inversify.config');
        const { TYPES } = await import('../configs/types');

        if (job.type === 'leave-status') {
            const emailService = container.get<EmailService>(TYPES.EmailService);
            await emailService.sendLeaveStatusEmail(
                job.data.maNghiPhep,
                job.data.ngayNghiData
            );
        } else {
            throw new Error(`Unknown job type: ${job.type}`);
        }
    }
}

export const emailQueue = new EmailQueue();
