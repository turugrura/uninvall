import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import {
	Cron,
	CronExpression,
	Interval,
	SchedulerRegistry,
	Timeout,
} from '@nestjs/schedule'

@Injectable()
export class TasksService {
	constructor(
		private readonly logger: Logger,
		private schedulerRegistry: SchedulerRegistry,
	) {}

	@Cron('45 * * * * *', { name: 'cron1' })
	private handleCron1(): void {
		this.logger.debug('cron every 45 secs')
	}

	@Cron(CronExpression.EVERY_5_SECONDS, { name: 'cron2' })
	private handleCron2(): void {
		this.logger.debug('cron every 5 secs')
	}

	@Interval('interval1', 10000)
	private handleInterval1(): void {
		this.logger.warn('interval1 every 10 secs')
	}

	@Interval('interval2', 20000)
	private handleInterval2(): void {
		this.logger.warn('interval2 every 20 secs')
	}

	@Timeout(60000)
	private handleTimeout1(): void {
		this.deleteAllCronjob()
		this.logger.log('delete all cronjobs success')
	}

	@Timeout(60000)
	private handleTimeout2(): void {
		this.deleteAllIntervals()
		this.logger.log('delete all intervals success')
	}

	getAllCronjobs(): any {
		const allJobs = []
		const jobs = this.schedulerRegistry.getCronJobs()

		jobs.forEach((value, key, map) => {
			let next
			try {
				next = value.nextDates().toJSDate()
			} catch (e) {
				next = 'error: next fire date is in the past!'
			}
			allJobs.push({
				key,
				// source: value.cronTime.source,
				// lastExecution: value.lastExecution,
				next,
				isRunning: value.running,
			})
		})

		return allJobs
	}

	getAllIntervals(): any {
		const allJobs = []
		const jobs = this.schedulerRegistry.getIntervals()

		jobs.forEach((value, index, array) => {
			allJobs.push({ value, index, array })
		})

		return allJobs
	}

	getAllTimeouts(): any {
		const allJobs = []
		const jobs = this.schedulerRegistry.getTimeouts()

		jobs.forEach((value, index, array) => {
			allJobs.push({ value, index, array })
		})

		return allJobs
	}

	deleteCronjob(id: string): void {
		try {
			this.schedulerRegistry.deleteCronJob(id)
		} catch (e) {
			throw new NotFoundException(`${id} not found`)
		}
	}

	deleteAllCronjob(): void {
		this.getAllCronjobs().forEach(({ key }) => {
			this.deleteCronjob(key)
		})
	}

	deleteInterval(id: string): void {
		try {
			const job = this.schedulerRegistry.deleteInterval(id)
		} catch (e) {
			throw new NotFoundException(`${id} not found`)
		}
	}

	deleteAllIntervals(): void {
		this.getAllIntervals().forEach(({ value }) => {
			this.deleteInterval(value)
		})
	}

	deleteTimeout(id: string): void {
		try {
			this.schedulerRegistry.deleteTimeout(id)
		} catch (e) {
			throw new NotFoundException(`${id} not found`)
		}
	}
}
