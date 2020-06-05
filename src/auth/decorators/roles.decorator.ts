import { SetMetadata } from '@nestjs/common'
import { Role } from '../../users/entities/user.entity'
import { ROLE_METADATA_KEY } from '../constants'

export const Roles = (...roles: Role[]) => SetMetadata(ROLE_METADATA_KEY, roles)
