import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class MyLogger extends Logger {
	private count = 0

	log(message: any, context?: string) {
		super.log(`Count: ${++this.count}`)
		console.log('log', {message}, )
	}
	error(message: any, trace?: string, context?: string) {
		super.error(`Count: ${++this.count}`)
		console.error('error', {message}, )
	}
	warn(message: any, context?: string) {
		super.warn(`Count: ${++this.count}`)
		console.warn('warn', {message}, )
	}
	debug(message: any, context?: string) {
		super.debug(`Count: ${++this.count}`)
		console.debug('debug', {message}, )
	}
	verbose(message: any, context?: string) {
		super.verbose(`Count: ${++this.count}`)
		console.info('info', {message}, )
	}
}
