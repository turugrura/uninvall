import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'

// export function RolesAuth(...roles: string[]): any {
// 	return applyDecorators(
// 		SetMetadata('roles', roles),
// 		UseGuards(AuthGuard, RolesGuard),
// 	)
// }
export const RolesAuth = (...roles: string[]): any => {
	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(AuthGuard, RolesGuard),
	)
}
