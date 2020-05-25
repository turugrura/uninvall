import { Test, TestingModule } from '@nestjs/testing'
import { User } from './user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('Users Controller', () => {
	const mockUsersService = {
		create: (): any => {},
	}
	let userController: UsersController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile()

		userController = module.get<UsersController>(UsersController)
	})

	it('should be defined', () => {
		expect(userController).toBeDefined()
	})

	describe('create', () => {
		it('should return an user', async () => {
			const user: User = {
				id: 1,
				firstName: 'firstName',
				lastName: 'lastName',
				isActive: true,
				password: 'password',
				fullName: 'firstName lastName',
				photos: [],
			}
			jest.spyOn(mockUsersService, 'create').mockResolvedValue(user)

			const res = await userController.create({
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
			})

			expect(res).toEqual<User>(user)
			expect(mockUsersService.create).toHaveBeenCalledTimes(1)
			expect(mockUsersService.create).toHaveBeenCalledWith({
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
			})
		})
	})
})
