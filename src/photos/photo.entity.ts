import { IsString } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../users/user.entity'

@Entity({ name: 'photo' })
export class PhotoEntity {
	@PrimaryGeneratedColumn()
	id: number

	@IsString()
	@Column()
	path: string

	@ManyToOne(() => User)
	user: number

	// constructor(photo: Photo) {
	// 	this.path = photo.path
	// 	this.userId = photo.userId
	// }
}

interface Photo {
	path: string
	userId: number
}
