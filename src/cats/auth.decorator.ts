import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../common/guards/auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'

export function Auth(...roles: string[]): any {
	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(AuthGuard, RolesGuard),
	)
}
