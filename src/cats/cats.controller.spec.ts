import { Test } from '@nestjs/testing'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

describe('Cats Controller', () => {
	const mockCatsService = ({
		findAll: () => '',
		findOne: () => '',
		create: () => '',
		update: () => '',
		delete: () => '',
	} as any) as CatsService
	let catsController: CatsController

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [CatsController],
			providers: [{ provide: CatsService, useValue: mockCatsService }],
		}).compile()

		catsController = moduleRef.get<CatsController>(CatsController)
	})

	it('should findAll then return an array of cats', async () => {
		const cat: any = [{ name: 'n', age: 10, breed: 'xx' }]
		jest.spyOn(mockCatsService, 'findAll').mockResolvedValue([{ ...cat }])

		expect(await catsController.findAll()).toEqual([{ ...cat }])
	})

	it('should find then return a cat', async () => {
		const cat: any = [{ name: 'n', age: 10, breed: 'xx' }]
		jest.spyOn(mockCatsService, 'findOne').mockResolvedValue({ ...cat })

		expect(await catsController.findOne('id')).toEqual({ ...cat })
	})

	it('should create then return a cat', async () => {
		const cat: any = [{ name: 'n', age: 10, breed: 'xx' }]
		jest.spyOn(mockCatsService, 'create').mockResolvedValue({ ...cat })

		expect(await catsController.create({ ...cat })).toEqual({ ...cat })
	})

	it('should update then return a cat', async () => {
		const cat: any = [{ name: 'n', age: 10, breed: 'xx' }]
		jest.spyOn(mockCatsService, 'update').mockResolvedValue({ ...cat })

		expect(await catsController.update('id', { ...cat })).toEqual({ ...cat })
	})

	it('should delete then return a cat', async () => {
		const cat: any = [{ name: 'n', age: 10, breed: 'xx' }]
		jest.spyOn(mockCatsService, 'delete').mockResolvedValue({ ...cat })

		expect(await catsController.delete('id')).toEqual({ ...cat })
	})
})
