import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { Auth } from '../common/decorators/auth.decorator'
import { ParseIntPipe } from '../common/pipes/parse-int.pipe'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Get()
	async findAll(): Promise<Cat[]> {
		return this.catsService.findAll()
	}

	@Get(':id')
	// @HttpCode(204)
	// @Header('Cache-Control', 'none')
	// @Redirect('https://3000', 301)
	findOne(
		@Query('version') version: string,
		@Param('id', new ParseIntPipe()) id: number,
	) {
		if (version && version === '5') {
			return { url: 'https://docs.nestjs.com/v5/' }
		}

		return this.catsService.findOne(id)
	}

	@Post()
	// @UsePipes(new JoiValidationPipe(CreateCatDto))
	@Auth('admin')
	async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
		this.catsService.create(createCatDto)

		return createCatDto
	}

	@Post(':id')
	@Auth('admin')
	async update(
		@Param('id', new ParseIntPipe()) id: number,
		@Body() updateCatDto: UpdateCatDto,
	): Promise<Cat> {
		return this.catsService.update(id, updateCatDto)
	}
}
