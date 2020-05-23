import { IsInt, IsString } from 'class-validator'

export class UploadPhotoDto {
	@IsString()
	path: string

	@IsInt()
	userId: number
}
