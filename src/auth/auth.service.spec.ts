import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Role, UserEntity } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
	const mockUsersService = ({
		findByUsername: () => '',
	} as unknown) as UsersService
	const mockJwtService = ({
		sign: () => '',
	} as unknown) as JwtService
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
		jest.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should validate user', async () => {
		const user: UserEntity = {
			_id: 'id_1',
			username: 'u1',
			password: 'p1',
			firstName: 'f1',
			lastName: 'p1',
			isActive: true,
			role: Role.admin,
		}
		jest
			.spyOn(mockUsersService, 'findByUsername')
			.mockResolvedValue({ ...user })

		const validateUser = await service.validateUser('f1', 'p1')

		expect(validateUser).toEqual({ ...user })
	})

	it('should log in', async () => {
		const user: UserEntity = {
			_id: 'id_1',
			username: 'u1',
			password: 'p1',
			firstName: 'f1',
			lastName: 'p1',
			isActive: true,
			role: Role.admin,
		}
		const signOutput = 'sign_output'
		jest.spyOn(mockJwtService, 'sign').mockReturnValue(signOutput)

		const login = await service.login({ ...user })

		expect(login.access_token).toBe(signOutput)
	})
})
