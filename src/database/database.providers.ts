import { Provider } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { MONGO_DB_CONNECTION } from './constants'

export const databaseProviders: Provider[] = [
	{
		provide: getConnectionToken(MONGO_DB_CONNECTION),
		useFactory: (): Promise<typeof mongoose> =>
			mongoose.connect('mongodb://localhost/nest', {
			}),
	},
]
