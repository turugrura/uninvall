import { Exclude, Expose } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PhotoEntity } from '../photos/photo.entity'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column({ default: true })
	isActive: boolean

	@Column()
	@Exclude()
	password: string

	@Expose()
	get fullName(): string {
		return `${this.firstName} ${this.lastName}`
	}

	@OneToMany(
		() => PhotoEntity,
		photo => photo.id,
	)
	photos: PhotoEntity[]

	// constructor(partial: Partial<User>) {
	// 	Object.assign(this, partial)
	// }

	// @OneToMany(
	// 	type => Photo,
	// 	photo => photo.user,
	// )
	// photos: Photo[]
}
