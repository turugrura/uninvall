import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Photo {
	@PrimaryGeneratedColumn()
	user: User

	@Column()
	path: string
}
