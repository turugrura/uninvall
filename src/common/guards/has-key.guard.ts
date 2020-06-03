import { CanActivate, ExecutionContext } from '@nestjs/common'

export class HasKeyGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const c = context.switchToHttp().getRequest()

		return true || c.query.access_key != null
	}
}
