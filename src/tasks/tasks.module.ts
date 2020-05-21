import { Logger, Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
	providers: [
		TasksService,
		{
			provide: Logger,
			useValue: new Logger(TasksService.name),
		},
	],
	controllers: [TasksController],
})
export class TasksModule {}
