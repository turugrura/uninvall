import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class MyLogger extends Logger {
	private count = 0

	log(message: any, context?: string) {
		super.log(`Count: ${++this.count}`)
		super.log(message, context)
	}
	error(message: any, trace?: string, context?: string) {
		super.error(`Count: ${++this.count}`)
		super.error(message, context)
	}
	warn(message: any, context?: string) {
		super.warn(`Count: ${++this.count}`)
		super.warn(message, context)
	}
	debug(message: any, context?: string) {
		super.debug(`Count: ${++this.count}`)
		super.debug(message, context)
	}
	verbose(message: any, context?: string) {
		super.verbose(`Count: ${++this.count}`)
		super.verbose(message, context)
	}
}
