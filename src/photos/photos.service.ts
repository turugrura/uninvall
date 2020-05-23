import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UploadPhotoDto } from './dto/upload-photo.dto'
import { PhotoEntity } from './photo.entity'

@Injectable()
export class PhotosService {
	constructor(
		@InjectRepository(PhotoEntity)
		private photosRepository: Repository<PhotoEntity>,
	) {}

	uploadPhoto(uploadPhotoDto: UploadPhotoDto): void {
		const photo = new PhotoEntity()
		photo.path = uploadPhotoDto.path
		photo.user = uploadPhotoDto.userId

		this.photosRepository.save(photo)
	}

	async getPhotoByUserId(userId: number): Promise<PhotoEntity[]> {
		return await this.photosRepository.query(`
    select * from photo where userId = ${userId}`)
	}
}
