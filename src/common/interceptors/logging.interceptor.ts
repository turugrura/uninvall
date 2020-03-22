import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now()
    console.log(`LoggingInterceptor before...`)

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`LoggingInterceptor after...${Date.now() - now}`),
        ),
      )
  }
}
