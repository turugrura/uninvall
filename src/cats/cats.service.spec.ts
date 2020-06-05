import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { CAT_MODEL } from './constants'

class MockCatModel {
	constructor(public cat: any) {}

	save(): any {
		return this.cat
	}

	static lean(): any {
		return
	}

	static find(): any {
		return
	}

	static findOne(): any {
		return
	}

	static findByIdAndDelete(): any {
		return
	}

	static findByIdAndUpdate(): any {
		return
	}
}

describe('CatsService', () => {
	let service: CatsService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CatsService,
				{ provide: getModelToken(CAT_MODEL), useValue: MockCatModel },
			],
		}).compile()

		service = module.get<CatsService>(CatsService)
		jest.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should create a cat', async () => {
		const cat = { name: 'n1', age: 10, breed: 'no' }

		const newCat = await service.create({ ...cat })

		expect(newCat).toEqual({ ...cat })
	})

	it('should update a cat', async () => {
		const cat = { name: 'n1', age: 10, breed: 'no' }
		jest.spyOn(MockCatModel, 'findByIdAndUpdate').mockReturnThis()
		jest.spyOn(MockCatModel, 'lean').mockReturnValue({ ...cat })

		const updatedCat = await service.update('id1', { ...cat })

		expect(updatedCat).toEqual({ ...cat })
		expect(MockCatModel.findByIdAndUpdate).toHaveBeenCalledTimes(1)
	})

	it('should find all cat', async () => {
		const cat = { name: 'n1', age: 10, breed: 'no' }
		jest.spyOn(MockCatModel, 'find').mockReturnThis()
		jest.spyOn(MockCatModel, 'lean').mockReturnValue([{ ...cat }])

		const findAll = await service.findAll()

		expect(findAll).toEqual([{ ...cat }])
		expect(MockCatModel.find).toHaveBeenCalledTimes(1)
	})

	it('should find a cat', async () => {
		const cat = { name: 'n1', age: 10, breed: 'no' }
		jest.spyOn(MockCatModel, 'findOne').mockReturnThis()
		jest.spyOn(MockCatModel, 'lean').mockReturnValue({ ...cat })

		const findOne = await service.findOne('id1')

		expect(findOne).toEqual({ ...cat })
		expect(MockCatModel.findOne).toHaveBeenCalledTimes(1)
	})

	it('should delete a cat', async () => {
		const cat = { name: 'n1', age: 10, breed: 'no' }
		jest.spyOn(MockCatModel, 'findByIdAndDelete').mockReturnThis()
		jest.spyOn(MockCatModel, 'lean').mockReturnValue({ ...cat })

		const deletedCat = await service.delete('id1')

		expect(deletedCat).toEqual({ ...cat })
		expect(MockCatModel.findByIdAndDelete).toHaveBeenCalledTimes(1)
	})
})
