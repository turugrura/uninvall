import { Controller, Get, Post } from '@nestjs/common'
import { PhotoEntity } from './photo.entity'
import { PhotosService } from './photos.service'

@Controller('photos')
export class PhotosController {
	constructor(private photosService: PhotosService) {}

	@Post()
	uploadPhoto(): void {
		this.photosService.uploadPhoto({
			path: 'xxx',
			userId: 1,
		})
	}

	@Get()
	async getPhotoByUserId(): Promise<PhotoEntity[]> {
		return await this.photosService.getPhotoByUserId(1)
	}
}
