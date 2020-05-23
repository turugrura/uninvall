import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { CatSchema } from './schemas/cat.schema'

@Module({
	imports: [
		// MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }], 'cats'),
		MongooseModule.forFeatureAsync(
			[
				{
					name: 'Cat',
					useFactory: () => {
						const schema = CatSchema
						schema.pre('save', () => console.log('Pre save cat'))
						schema.pre('findOne', () => console.log('Pre findOne cat'))

						return schema
					},
				},
			],
			'cats',
		),
	],
	controllers: [CatsController],
	providers: [CatsService],
})
export class CatsModule {}
