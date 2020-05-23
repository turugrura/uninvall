import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
	constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

	async create(createCatDto: CreateCatDto): Promise<Cat> {
		const newCat = new this.catModel(createCatDto)

		return await newCat.save()
	}

	async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
		// return await this.catModel
		// 	.findOneAndUpdate({ _id: id }, updateCatDto)

		return await this.catModel.findByIdAndUpdate(id, updateCatDto, {
			new: true,
		})
	}

	async findAll(): Promise<Cat[]> {
		return await this.catModel.find().exec()
	}

	async findOne(id: string): Promise<Cat> {
		return await this.catModel.findOne({ _id: id })
	}
}
