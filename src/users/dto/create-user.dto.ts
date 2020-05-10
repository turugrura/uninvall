import { IsString } from 'class-validator'

export class CreateUserDto {
	@IsString()
	firstName: string

	@IsString({ always: true })
	lastName: string
}
