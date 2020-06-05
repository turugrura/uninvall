import { applyDecorators, UseGuards } from '@nestjs/common'
import { Role } from '../../users/entities/user.entity'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from './roles.decorator'

export function Auth(...roles: Role[]): any {
	return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard))
}
