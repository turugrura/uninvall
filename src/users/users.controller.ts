import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseInterceptors,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
		return this.usersService.create(createUserDto)
	}

	@Put('/:id')
	update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<UserEntity> {
		return this.usersService.update(id, updateUserDto)
	}

	@Get()
	findAll(): Promise<UserEntity[]> {
		return this.usersService.findAll()
	}

	@Get('/:id')
	findOne(@Param('id') id: string): Promise<UserEntity> {
		return this.usersService.findOne(id)
	}

	@Delete('/:id')
	delete(@Param('id') id: string): Promise<UserEntity> {
		return this.usersService.delete(id)
	}
}
