import { Controller, Delete, Get, Param } from '@nestjs/common'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	getAll(): any {
		return {
			cronjobs: this.tasksService.getAllCronjobs(),
			intervals: this.tasksService.getAllIntervals(),
			timeouts: this.tasksService.getAllTimeouts(),
		}
	}

	@Get('/cronjobs')
	getAllCronjobs(): any {
		return this.tasksService.getAllCronjobs()
	}

	@Get('/intervals')
	getAllIntervals(): any {
		return this.tasksService.getAllIntervals()
	}

	@Get('/timeouts')
	getAllTimeouts(): any {
		return this.tasksService.getAllTimeouts()
	}

	@Delete('/cronjobs/:id')
	deleteCronjob(@Param('id') id: string): void {
		this.tasksService.deleteCronjob(id)
	}

	@Delete('/intervals/:id')
	deleteInterval(@Param('id') id: string): void {
		this.tasksService.deleteInterval(id)
	}

	@Delete('/timeouts/:id')
	deleteTimeout(@Param('id') id: string): void {
		this.tasksService.deleteTimeout(id)
	}

	@Delete('/cronjobs')
	deleteAllCronjob(): void {
		this.tasksService.deleteAllCronjob()
	}

	@Delete('/intervals')
	deleteAllInterval(): void {
		this.tasksService.deleteAllIntervals()
	}

	@Delete()
	deleteAll(): void {
		this.tasksService.deleteAllCronjob()
		this.tasksService.deleteAllIntervals()
	}
}
