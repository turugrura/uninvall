import { Provider } from '@nestjs/common'
import { getConnectionToken, getModelToken } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MONGO_DB_CONNECTION } from '../database/constants'
import { USER_MODEL } from './constants'
import { UserSchema } from './schemas/user.schema'

export const userProviders: Provider[] = [
	{
		provide: getModelToken(USER_MODEL),
		useFactory: (connection: Connection) =>
			connection.model('User', UserSchema),
		inject: [getConnectionToken(MONGO_DB_CONNECTION)],
	},
]
