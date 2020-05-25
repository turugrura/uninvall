import { Logger } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from './tasks.service'

describe('TasksService', () => {
	const mockLogger = {} as Logger
	const mockSchedulerRegistry = {} as SchedulerRegistry
	let service: TasksService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TasksService,
				{ provide: Logger, useValue: mockLogger },
				{ provide: SchedulerRegistry, useValue: mockSchedulerRegistry },
			],
		}).compile()

		service = module.get<TasksService>(TasksService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
