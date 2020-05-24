import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.entity'
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
	): Promise<User | undefined> {
		const user = await this.usersService.findByUsername(username)
		if (user && user.password === password) return user

		return undefined
	}

	async login(user: User): Promise<{ access_token: string }> {
		const payload = { username: user.firstName, sub: user.id }

		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
