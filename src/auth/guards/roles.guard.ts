import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { UserEntity } from '../../users/entities/user.entity'
import { ROLE_METADATA_KEY } from '../constants'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.get<string[]>(
			ROLE_METADATA_KEY,
			context.getHandler(),
		)
		if (!roles) return false

		const request = context.switchToHttp().getRequest()
		const user = request.user as UserEntity

		return roles.includes(user.role)
	}
}
