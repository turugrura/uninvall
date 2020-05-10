import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserSubscriber } from './user.subcribers'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UsersService, UserSubscriber],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
