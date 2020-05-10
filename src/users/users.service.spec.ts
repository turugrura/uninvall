import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
	const mockRepository = {}
	const mockConnection = {}
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useValue: mockRepository,
				},
				{
					provide: getConnectionToken(),
					useValue: mockConnection,
				},
			],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
