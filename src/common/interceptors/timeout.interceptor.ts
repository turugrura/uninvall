import {
	CallHandler,
	ExecutionContext,
	NestInterceptor,
	RequestTimeoutException,
} from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'

export class TimeoutInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			timeout(2000),
			catchError(err => {
				if (err instanceof TimeoutError) {
					return throwError(new RequestTimeoutException())
				}

				return throwError(err)
			}),
		)
	}
}
