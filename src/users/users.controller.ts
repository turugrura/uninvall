import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseArrayPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto)
	}

	@Post('/many')
	createMany(@Body() createUsersDto: CreateUserDto[]): Promise<void> {
		return this.usersService.createMany(createUsersDto)
	}

	@Put('/:id')
	update(
		@Param('id') id: number,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		return this.usersService.update(id, updateUserDto)
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<User> {
		return this.usersService.findOne(id)
	}

	@Get()
	findByIds(
		@Query('ids', new ParseArrayPipe({ items: String, separator: ',' }))
		ids: string[],
	): Promise<User[]> {
		return this.usersService.findByIds(ids)
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.usersService.remove(id)
	}
}
