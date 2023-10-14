import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from '../schemas/friend.schema';

@Injectable()
export class FriendRepo {
	constructor(
		@InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
	) {
		this.friendModel.syncIndexes();
	}

	initDoc(model: Friend) {
		return new this.friendModel(model);
	}

	findEpisode(season: number, episode: number) {
		const id = this.createId({ season, episode });

		return this.friendModel.findById(id);
	}

	findEpisodeLean(season: number, episode: number) {
		return this.findEpisode(season, episode).lean();
	}

	findAllSeason() {
		const projection: { [field in keyof Friend]?: 1 } = {
			season: 1,
			episode: 1,
			title: 1,
		};

		return this.friendModel
			.aggregate<Omit<Friend, '_id' | 'sentences'>>([{ $project: projection }])
			.exec();
	}

	async upsert(doc: FriendDocument) {
		try {
			return await doc.save();
		} catch (error) {
			console.error({ error: error?.message });
			if (error.code === 11000) {
				await doc.updateOne();
			}
		}
	}

	updateEpisode(
		id: string,
		field: keyof Omit<Friend, 'sentences'>,
		value: string | null,
	): any {
		return this.friendModel.updateOne(
			{ _id: id },
			{ $set: { [field]: value } },
		);
	}

	createId<T extends { season: number; episode: number }>(model: T) {
		return `${model.season}_${model.episode}`;
	}

	async fix() {
		const xxx = [8, 10, 11, 12, 13, 14, 16, 17];
		for (const ep of [7, 9, 15, ...xxx]) {
			const x = await this.friendModel.findOne({ season: 10, episode: ep });
			for (const sent of x.sentences) {
				// const s = sent.speaker;
				// if (s) {
				//   const neww = s.replace('<strong>', '');
				//   if (neww === s) {
				//     continue;
				//   }
				//   sent.speaker = neww.charAt(0).toUpperCase() + neww.substr(1);
				// }

				const names = /<strong>(.*?)<\/strong>/i.exec(sent.raw.substr(0, 40));
				const name = names?.length > 1 ? names[1].replace(':', '') : null;
				if (!name) {
					continue;
				}
				const sentence = sent.raw.replace(names[0], '').trim();
				// console.log({ name, sentence: this.replaceStartWith(sentence) });

				sent.speaker = name;
				sent.sentence = this.replaceStartWith(sentence);
			}
			await x.save();
		}
	}

	replaceStartWith(text: string) {
		while (text) {
			if (text === '<hr>') {
				return;
			}
			if (text === '&nbsp;') {
				return;
			}

			if (text.startsWith('</')) {
				text = text.replace(/<\/.*?>/, '');
				continue;
			}
			if (text.startsWith(' ')) {
				text = text.replace(/ /, '');
				continue;
			}
			if (text.startsWith(':')) {
				text = text.replace(/:/, '');
				continue;
			}
			if (text.startsWith('\\r')) {
				text = text.replace(/\\r/, '');
				continue;
			}
			if (text.startsWith('\\n')) {
				text = text.replace(/\\n/, '');
				continue;
			}

			break;
		}

		return text;
	}
}
