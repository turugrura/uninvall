import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PhotoEntity } from './photo.entity'
import { PhotosService } from './photos.service'

describe('PhotosService', () => {
	const mockRepository = {} as Repository<PhotoEntity>
	let service: PhotosService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PhotosService,
				{ provide: getRepositoryToken(PhotoEntity), useValue: mockRepository },
			],
		}).compile()

		service = module.get<PhotosService>(PhotosService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
