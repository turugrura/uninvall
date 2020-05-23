import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
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
import { Logger } from './logger/logger.module'
import { PhotosModule } from './photos/photos.module'
import { TasksModule } from './tasks/tasks.module'
import { UsersModule } from './users/users.module'
import Joi = require('@hapi/joi')

@Module({
	imports: [
		CatsModule,
		UsersModule,
		AuthModule,
		TasksModule,
		Logger,
		PhotosModule,
		// TypeOrmModule.forRoot({
		// 	type: 'mysql',
		// 	host: 'localhost',
		// 	port: 3306,
		// 	username: 'test',
		// 	database: 'new_schema',
		// 	synchronize: true,
		// 	autoLoadEntities: true,
		// }),
		TypeOrmModule.forRootAsync({
			useFactory: () => {
				return {
					type: 'mysql',
					host: process.env.MYSQL_HOST,
					port: parseInt(process.env.MYSQL_PORT, 10),
					username: process.env.MYSQL_USERNAME,
					database: process.env.MYSQL_DATABASE,
					synchronize: false,
					autoLoadEntities: true,
					retryAttempts: 3,
				}
			},
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env.production', '.env.development'],
			load: [configuration],
			validationSchema: Joi.object({
				APPLICATION_PORT: Joi.number().required(),
				MYSQL_HOST: Joi.string().required(),
				MYSQL_PORT: Joi.number().required(),
				MYSQL_USERNAME: Joi.string().required(),
				MYSQL_DATABASE: Joi.string().required(),
			}),
		}),
		ScheduleModule.forRoot(),
		MongooseModule.forRoot('mongodb://localhost/nest', {
			connectionName: 'cats',
			useFindAndModify: false,
		}),
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
