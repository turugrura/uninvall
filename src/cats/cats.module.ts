import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { ValidationPipe } from '../common/pipes/validation.pipe'

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
