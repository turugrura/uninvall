import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
	data: T;
}

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, Response<T>> {
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>,
	): Observable<Response<T>> | Promise<Observable<Response<T>>> {
		return next.handle().pipe(
			map(data => {
				return { data };
			}),
			catchError(d => {
				console.log(d);
				return throwError(() => d);
			}),
		);
	}
}
