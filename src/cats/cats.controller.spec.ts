import { Test } from '@nestjs/testing'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

describe('Cats Controller', () => {
	const mockCatsService = {
		findAll: () => {},
	} as CatsService
	let catsController: CatsController

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [CatsController],
			providers: [{ provide: CatsService, useValue: mockCatsService }],
		}).compile()

		catsController = moduleRef.get<CatsController>(CatsController)
	})

	describe('findAll', () => {
		it('should return an array of cats', async () => {
			const result: any = [{ name: 'n', age: 10, breed: 'xx' }]
			jest.spyOn(mockCatsService, 'findAll').mockResolvedValue(result)

			expect(await catsController.findAll()).toBe(result)
		})
	})
})
