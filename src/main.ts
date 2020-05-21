import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	)
	app.use(helmet())
	// app.use(csurf())
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
		}),
	)

	await app.listen(3000)
}
bootstrap()
