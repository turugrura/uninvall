import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { HasKeyGuard } from './common/guards/has-key.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { FriendTranslatorModule } from './friend-translator/friend-translator.module';
import { LoggerModule } from './logger/logger.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import Joi = require('@hapi/joi');

@Module({
	imports: [
		CatsModule,
		UsersModule,
		AuthModule,
		TasksModule,
		LoggerModule,
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
		// ScheduleModule.forRoot(),
		DatabaseModule,
		FriendTranslatorModule,
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
			useClass: HasKeyGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor,
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
			.forRoutes(CatsController);
	}
}
