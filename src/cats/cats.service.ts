import { Injectable } from '@nestjs/common'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
	private readonly cats: Cat[] = []

	public create(cat: Cat): void {
		this.cats.push(cat)
	}

	public update(id: number, cat: Cat): Cat {
		this.cats[id] = cat
		return cat
	}

	public findAll(): Cat[] {
		return this.cats
	}

	public findOne(id: number): Cat {
		return this.cats[id]
	}
}
