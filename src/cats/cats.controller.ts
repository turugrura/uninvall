import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { Role } from '../users/entities/user.entity'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { CatEntity } from './entities/cat.entity'

@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Auth(Role.user, Role.admin)
	@Get()
	async findAll(): Promise<CatEntity[]> {
		return this.catsService.findAll()
	}

	@Auth(Role.user, Role.admin)
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.catsService.findOne(id)
	}

	@Auth(Role.admin)
	@Post()
	async create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
		return await this.catsService.create(createCatDto)
	}

	@Auth(Role.admin)
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCatDto: UpdateCatDto,
	): Promise<CatEntity> {
		return await this.catsService.update(id, updateCatDto)
	}

	@Auth(Role.admin)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<CatEntity> {
		return this.catsService.delete(id)
	}
}
