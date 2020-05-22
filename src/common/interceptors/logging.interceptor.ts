import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { MyLogger } from '../../logger/my-logger.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(private myLogger: MyLogger) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		const now = Date.now()
		this.myLogger.log('LoggingInterceptor before...')

		return next
			.handle()
			.pipe(
				tap(() =>
					this.myLogger.log(
						`LoggingInterceptor after... take time ${Date.now() - now} ms`,
					),
				),
			)
	}
}
