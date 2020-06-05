import { Provider } from '@nestjs/common'
import { getConnectionToken, getModelToken } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MONGO_DB_CONNECTION } from '../database/constants'
import { CAT_MODEL } from './constants'
import { CatSchema } from './schemas/cat.schema'

export const catsProviders: Provider[] = [
	{
		provide: getModelToken(CAT_MODEL),
		useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
		inject: [getConnectionToken(MONGO_DB_CONNECTION)],
	},
]
