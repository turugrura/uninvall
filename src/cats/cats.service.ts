import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CAT_MODEL } from './constants'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { CatEntity } from './entities/cat.entity'
import { CatModel } from './schemas/cat.schema'

@Injectable()
export class CatsService {
	constructor(@InjectModel(CAT_MODEL) private catModel: Model<CatModel>) {}

	async create(createCatDto: CreateCatDto): Promise<CatEntity> {
		const { name, age, breed } = createCatDto
		const newCat = new this.catModel({ name, age, breed }).save()

		return newCat
	}

	async update(id: string, updateCatDto: UpdateCatDto): Promise<CatEntity> {
		return this.catModel
			.findByIdAndUpdate(id, updateCatDto, {
				new: true,
			})
			.lean()
	}

	async findAll(): Promise<CatEntity[]> {
		return this.catModel.find().lean()
	}

	async findOne(id: string): Promise<CatEntity> {
		return this.catModel.findOne({ _id: id }).lean()
	}

	async delete(id: string): Promise<CatEntity> {
		return this.catModel.findByIdAndDelete(id).lean()
	}
}
