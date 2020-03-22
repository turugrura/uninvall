import { Test } from '@nestjs/testing'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

describe('Cats Controller', () => {
	let catsController: CatsController
	let catsService: CatsService

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [CatsController],
			providers: [CatsService],
		}).compile()

		catsController = moduleRef.get<CatsController>(CatsController)
		catsService = moduleRef.get<CatsService>(CatsService)
	})

	describe('findAll', () => {
		it('should return an array of cats', async () => {
			const result = [{ name: 'n', age: 10, breed: 'xx' }]
			jest.spyOn(catsService, 'findAll').mockImplementation(() => result)

			expect(await catsController.findAll()).toBe(result)
		})
	})
})
