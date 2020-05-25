import { Test, TestingModule } from '@nestjs/testing'
import { PhotosController } from './photos.controller'
import { PhotosService } from './photos.service'

describe('Photos Controller', () => {
	const mockPhotosService = ({} as unknown) as PhotosService
	let controller: PhotosController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PhotosController],
			providers: [{ provide: PhotosService, useValue: mockPhotosService }],
		}).compile()

		controller = module.get<PhotosController>(PhotosController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
