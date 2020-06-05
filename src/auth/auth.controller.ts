import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { UserModel } from '../users/schemas/user.schema'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	async login(@Request() req): Promise<any> {
		return this.authService.login(req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/me')
	getProfile(@Request() req): Promise<UserModel> {
		return req.user
	}
}
