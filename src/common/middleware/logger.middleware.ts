import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // const keys = Object.keys(req)
    const { headers, url, baseUrl, params, method, query, body } = req
    // console.log('req with ', headers, url, baseUrl, params, method, query, body)
    console.log(`${method}:${url}`)

    next()
  }
}
