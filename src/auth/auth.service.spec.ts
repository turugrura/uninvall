import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
	const mockUsersService = ({
		findByUsername: () => {},
	} as undefined) as UsersService
	const mockJwtService = {} as JwtService
	let service: AuthService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: UsersService, useValue: mockUsersService },
				{ provide: JwtService, useValue: mockJwtService },
			],
		}).compile()

		service = module.get<AuthService>(AuthService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should validate user', async () => {
		const user = new User()
		user.firstName = 'f1'
		user.password = 'p1'
		jest.spyOn(mockUsersService, 'findByUsername').mockResolvedValue(user)

		const validateUser = await service.validateUser('f1', 'p1')

		expect(validateUser).toEqual({ firstName: 'f1', password: 'p1' })
	})
})
