import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from './roles.decorator'

export function Auth(...roles: string[]): any {
	return applyDecorators(
		// SetMetadata('roles', roles),
		Roles(...roles),
		UseGuards(AuthGuard, RolesGuard),
	)
}
