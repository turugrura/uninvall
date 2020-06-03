import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(
		username: string,
		password: string,
	): Promise<UserEntity | undefined> {
		const user = await this.usersService.findByUsername(username)
		if (user && user.password === password) return user

		return undefined
	}

	async login(user: UserEntity): Promise<{ access_token: string }> {
		const payload = { username: user.username, sub: user._id, role: user.role }

		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
