import { Exclude, Expose } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
	// constructor(partial: Partial<User>) {
	// 	Object.assign(this, partial)
	// }

	// @OneToMany(
	// 	type => Photo,
	// 	photo => photo.user,
	// )
	// photos: Photo[]
}
