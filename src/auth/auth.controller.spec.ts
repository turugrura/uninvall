import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('Auth Controller', () => {
	const mockAuthService = ({
		login: () => undefined,
	} as unknown) as AuthService
	let controller: AuthController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useValue: mockAuthService }],
		}).compile()

		controller = module.get<AuthController>(AuthController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should return access token', async () => {
		const req = {
			user: {
				username: 'u1',
				password: 'p1',
				firstName: 'f1',
			},
		}
		jest
			.spyOn(mockAuthService, 'login')
			.mockResolvedValue({ access_token: 'token' })

		const login = await controller.login(req)

		expect(login).toEqual({ access_token: 'token' })
	})

	it('should return user', async () => {
		const req = {
			user: {
				username: 'u1',
				password: 'p1',
				firstName: 'f1',
			},
		}

		const profile = await controller.getProfile(req)

		expect(profile).toEqual({ ...req.user })
	})
})
