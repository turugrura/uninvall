import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
		// logger: false,
	})

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	)
	app.use(helmet())
	// app.use(csurf())
	app.use(compression());
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
		}),
	)
	// app.useLogger(app.get(MyLogger))

	await app.listen(process.env.PORT)
	console.log(`App running on ${await app.getUrl()}`);
}
bootstrap()
