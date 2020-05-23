import * as mongoose from 'mongoose'

export interface Cat extends mongoose.Document {
	name: string
	age: number
	breed: string
}
