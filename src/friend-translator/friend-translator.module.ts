import { Module } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MONGO_DB_CONNECTION } from 'src/database/constants';
import { DatabaseModule } from 'src/database/database.module';
import { FriendTranslatorController } from './friend-translator.controller';
import { FriendTranslatorService } from './friend-translator.service';
import { FriendRepo } from './repositories/friend.repo';
import { Friend, FriendSchema } from './schemas/friend.schema';

@Module({
	controllers: [FriendTranslatorController],
	imports: [
		// MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
		DatabaseModule,
	],
	providers: [
		FriendTranslatorService,
		FriendRepo,
		{
			provide: getModelToken(Friend.name),
			useFactory: (connection: Connection) =>
				connection.model('Friends', FriendSchema),
			inject: [getConnectionToken(MONGO_DB_CONNECTION)],
		},
	],
	exports: [FriendTranslatorService],
})
export class FriendTranslatorModule {}
