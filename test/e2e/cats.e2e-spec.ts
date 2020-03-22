import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { CatsModule } from '../../src/cats/cats.module'
import { CatsService } from '../../src/cats/cats.service'

describe('Cats', () => {
	let app: INestApplication
	let catsService = { findAll: () => ['t'] }

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [CatsModule],
		})
			.overrideProvider(CatsService)
			.useValue(catsService)
			.compile()

		app = moduleRef.createNestApplication()
		await app.init()
	})

	it('/GET cats', () => {
		return request(app.getHttpServer())
			.get('/cats')
			.expect(200)
			.expect(catsService.findAll())
		// .expect({
		// 	data: catsService.findAll(),
		// })
	})

	afterAll(async () => {
		await app.close()
	})
})
