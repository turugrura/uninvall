import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
		private connection: Connection,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = new User()
		user.firstName = createUserDto.firstName
		user.lastName = createUserDto.lastName
		user.password = createUserDto.password

		return await this.usersRepository.save(user)
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.usersRepository.findOne(id)
		user.firstName = updateUserDto.firstName
		user.lastName = updateUserDto.lastName

		return await this.usersRepository.save(user)
	}

	async findAll(): Promise<User[]> {
		return await this.usersRepository.find()
	}

	async findOne(id: string): Promise<User | undefined> {
		return await this.usersRepository.findOne(id)
	}

	async findByIds(ids: string[]): Promise<User[]> {
		return await this.usersRepository.findByIds(ids)
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id)
	}

	async findByUsername(username: string): Promise<User | undefined> {
		return await this.usersRepository.findOne(undefined, {
			where: { firstName: username },
		})
	}

	async createMany(users: CreateUserDto[]): Promise<void> {
		const queryRunner = this.connection.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()
		try {
			for (const newUser of users) {
				const user = new User()
				user.firstName = newUser.firstName
				user.lastName = newUser.lastName
				await queryRunner.manager.save(user)
			}
			await queryRunner.commitTransaction()
		} catch (err) {
			// since we have errors lets rollback the changes we made
			await queryRunner.rollbackTransaction()
		} finally {
			// you need to release a queryRunner which was manually instantiated
			queryRunner.isReleased ? await queryRunner.release() : null
		}
	}
}
