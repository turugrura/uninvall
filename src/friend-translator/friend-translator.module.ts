import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendTranslatorController } from './friend-translator.controller';
import { FriendTranslatorService } from './friend-translator.service';
import { FriendRepo } from './repositories/friend.repo';
import { Friend, FriendSchema } from './schemas/friend.schema';

@Module({
	controllers: [FriendTranslatorController],
	imports: [
		MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
	],
	providers: [FriendTranslatorService, FriendRepo],
	exports: [FriendTranslatorService],
})
export class FriendTranslatorModule {}
