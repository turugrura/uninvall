import {
	applyDecorators,
	Body,
	CanActivate,
	Controller,
	ExecutionContext,
	Get,
	Injectable,
	Param,
	Post,
	Query,
	SetMetadata,
	UseGuards,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { AuthGuard } from '../common/guards/auth.guard'
// import { RolesAuth } from '../common/decorators/auth.decorator'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.get<string[]>('roles', context.getHandler())
		if (!roles) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const user = request.user
		console.log(user)

		return true
	}
}

export const RolesAuth = (...roles: string[]): any => {
	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(AuthGuard, RolesGuard),
	)
}

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
	findOne(@Query('version') version: string, @Param('id') id: string) {
		if (version && version === '5') {
			return { url: 'https://docs.nestjs.com/v5/' }
		}

		return this.catsService.findOne(id)
	}

	@Post()
	// @UsePipes(new JoiValidationPipe(CreateCatDto))
	@RolesAuth('admin')
	async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
		return await this.catsService.create(createCatDto)
	}

	@Post(':id')
	@RolesAuth('admin')
	async update(
		@Param('id') id: string,
		@Body() updateCatDto: UpdateCatDto,
	): Promise<Cat> {
		return await this.catsService.update(id, updateCatDto)
	}
}
