import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { CatEntity } from '../entities/cat.entity'

@Schema()
export class CatModel extends Document implements CatEntity {
	@Prop({ required: true })
	name: string

	@Prop()
	age: number

	@Prop()
	breed: string
}

export const CatSchema = SchemaFactory.createForClass(CatModel)
	.pre('find', () => console.log('find cat'))
	.pre('findOne', () => console.log('findOne cat'))
