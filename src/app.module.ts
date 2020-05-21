import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CatsController } from './cats/cats.controller'
import { CatsModule } from './cats/cats.module'
import { AuthGuard } from './common/guards/auth.guard'
import { RolesGuard } from './common/guards/roles.guard'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor'
import { TranformInterceptor } from './common/interceptors/transform.interceptor'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { ValidationPipe } from './common/pipes/validation.pipe'
import configuration from './config/configuration'
import { PhotosService } from './photos/photos.service'
import { TasksModule } from './tasks/tasks.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		CatsModule,
		UsersModule,
		AuthModule,
		TasksModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'test',
			database: 'new_schema',
			synchronize: true,
			autoLoadEntities: true,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.development.env'],
			load: [configuration],
		}),
		ScheduleModule.forRoot(),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TranformInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TimeoutInterceptor,
		},
		PhotosService,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.exclude({
				path: 'cats',
				method: RequestMethod.GET,
			})
			.forRoutes(CatsController)
	}
}
