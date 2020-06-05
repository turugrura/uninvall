import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Role, UserEntity } from '../entities/user.entity'

@Schema()
export class UserModel extends Document implements UserEntity {
	@Prop({ type: String })
	username: string

	@Prop({ type: String })
	password: string

	@Prop({ type: String })
	firstName: string

	@Prop({ type: String })
	lastName: string

	@Prop({ type: String })
	role: Role

	@Prop({ default: true, type: Boolean })
	isActive: boolean

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`
	}
}

export const UserSchema = SchemaFactory.createForClass(UserModel)
	.pre('find', () => console.log('find user'))
	.pre('findOne', () => console.log('findOne user'))
