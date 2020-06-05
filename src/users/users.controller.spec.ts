import { Test, TestingModule } from '@nestjs/testing'
import { Role, UserEntity } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('Users Controller', () => {
	const mockUsersService = ({
		findAll: () => '',
		findOne: () => '',
		create: () => '',
		update: () => '',
		delete: () => '',
	} as any) as UsersService
	const user: UserEntity = {
		_id: '1',
		username: 'u1',
		password: 'p1',
		firstName: 'f1',
		lastName: 'l1',
		isActive: true,
		role: Role.admin,
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

	it('should find all then return all users', async () => {
		jest.spyOn(mockUsersService, 'findAll').mockResolvedValue([{ ...user }])

		const findAllOutput = await userController.findAll()

		expect(findAllOutput).toEqual([{ ...user }])
	})

	it('should find one then return an user', async () => {
		jest.spyOn(mockUsersService, 'findOne').mockResolvedValue({ ...user })

		const findOneOutput = await userController.findOne('id')

		expect(findOneOutput).toEqual({ ...user })
	})

	it('should create then return an user', async () => {
		jest.spyOn(mockUsersService, 'create').mockResolvedValue({ ...user })

		const createOutput = await userController.create({ ...user })

		expect(createOutput).toEqual({ ...user })
	})

	it('should update then return an user', async () => {
		jest.spyOn(mockUsersService, 'update').mockResolvedValue({ ...user })

		const updateOutput = await userController.update('id', { ...user })

		expect(updateOutput).toEqual({ ...user })
	})

	it('should delete then return an user', async () => {
		jest.spyOn(mockUsersService, 'delete').mockResolvedValue({ ...user })

		const deleteOutput = await userController.delete('id')

		expect(deleteOutput).toEqual({ ...user })
	})
})
