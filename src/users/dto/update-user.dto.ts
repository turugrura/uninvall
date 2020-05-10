import { IsString } from 'class-validator'

export class UpdateUserDto {
	@IsString()
	firstName: string

	@IsString({ always: true })
	lastName: string
}
