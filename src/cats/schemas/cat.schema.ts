import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

// export const CatSchema = new mongoose.Schema({
// 	name: String,
// 	age: Number,
// 	breed: String,
// })

@Schema()
export class Cat extends mongoose.Document {
	@Prop({ required: true })
	name: string

	@Prop()
	age: number

	@Prop()
	breed: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)
