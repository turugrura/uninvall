import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { USER_MODEL } from './constants'
import { Role } from './entities/user.entity'
import { UsersService } from './users.service'

const mockUser = {
	username: 'u1',
	password: 'p1',
	firstName: 'f1',
	lastName: 'l1',
	role: Role.admin,
}

class MockUserModel {
	constructor(public user?: any) {
		if (!user) {
			this.user = { ...mockUser }
		}
	}

	save(): any {
		return this
	}

	lean(): any {
		return this.user
	}

	toObject(): any {
		return this.user
	}

	static findByIdAndUpdate(): any {
		return new MockUserModel()
	}

	static find(): any {
		const userModel = new MockUserModel()
		userModel.user = [userModel.user]

		return userModel
	}

	static findById(): any {
		return new MockUserModel()
	}

	limit(): any {
		this.user = [this.user[0]]

		return this
	}

	static findByIdAndRemove(): any {
		return new MockUserModel()
	}
}
describe('UsersService', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getModelToken(USER_MODEL),
					useValue: MockUserModel,
				},
			],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should findAll then return an array of users', async () => {
		const findAllOutput = await service.findAll()

		expect(findAllOutput).toEqual([mockUser])
	})

	it('should find one then return an user', async () => {
		const findOneOutput = await service.findOne('id')

		expect(findOneOutput).toEqual({ ...mockUser })
	})

	it('should create then return an user', async () => {
		const createOutput = await service.create({ ...mockUser })

		expect(createOutput).toEqual({ ...mockUser })
	})

	it('should update then return an user', async () => {
		const updateOutput = await service.update('id', { ...mockUser })

		expect(updateOutput).toEqual({ ...mockUser })
	})

	it('should delete then return an user', async () => {
		const deleteOutput = await service.delete('id')

		expect(deleteOutput).toEqual({ ...mockUser })
	})

	it('should find by username then return an user', async () => {
		const findByUsernameOutput = await service.findByUsername('id')

		expect(findByUsernameOutput).toEqual({ ...mockUser })
	})
})
