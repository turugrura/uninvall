import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { USER_MODEL } from './constants'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { UserModel } from './schemas/user.schema'

@Injectable()
export class UsersService {
	constructor(@InjectModel(USER_MODEL) private userModel: Model<UserModel>) {}

	async create(createUserDto: CreateUserDto): Promise<UserEntity> {
		const { firstName, lastName, password, username, role } = createUserDto
		const user = new this.userModel({
			firstName,
			lastName,
			password,
			username,
			role,
		})

		return (await user.save()).toObject()
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
		const { firstName, lastName } = updateUserDto
		const user = await this.userModel
			.findByIdAndUpdate(
				id,
				{
					firstName,
					lastName,
				},
				{ new: true },
			)
			.lean()

		return user
	}

	async findAll(): Promise<UserEntity[]> {
		const user = await this.userModel.find().lean()

		return user
	}

	async findOne(id: string): Promise<UserEntity | undefined> {
		const user = await this.userModel.findById(id).lean()

		return user
	}

	async delete(id: string): Promise<UserEntity> {
		const user = await this.userModel.findByIdAndRemove(id).lean()

		return user
	}

	async findByUsername(username: string): Promise<UserEntity | undefined> {
		const user = await this.userModel
			.find({ username })
			.limit(1)
			.lean()

		if (!user.length) return undefined

		return user[0]
	}
}
