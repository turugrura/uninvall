import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PatchSentenceRequest } from './dtos/patch-sentence.request';
import { UpdateTitleRequest } from './dtos/update-title.request';
import { FriendRepo } from './repositories/friend.repo';
import { Friend } from './schemas/friend.schema';

@Injectable()
export class FriendTranslatorService {
	constructor(private friendRepo: FriendRepo) {}

	getList() {
		return this.friendRepo.findAllSeason();
	}

	async getEpisode(season: number, episode: number) {
		const ep = await this.friendRepo.findEpisodeLean(season, episode);
		if (!ep) {
			throw new NotFoundException();
		}

		return ep;
	}

	async create(data: Partial<Friend>) {
		const id = this.friendRepo.createId({
			season: data.season,
			episode: data.episode,
		});
		const f = this.friendRepo.initDoc({
			_id: id,
			episode: data.episode,
			season: data.season,
			title: data.title,
			sentences: data.sentences,
		});

		return this.friendRepo.upsert(f);
	}

	async patchSentence(request: PatchSentenceRequest) {
		const { season, episode, index, speaker, sentence, th } = request;

		const data = await this.friendRepo.findEpisode(season, episode);
		if (!data) {
			throw new BadRequestException();
		}

		data.sentences[index].speaker = speaker;
		data.sentences[index].th = th;
		data.sentences[index].sentence = sentence;

		return data.save();
	}

	async updateTitle(request: UpdateTitleRequest): Promise<any> {
		const { title } = request;
		const id = this.friendRepo.createId(request);

		return this.friendRepo.updateEpisode(id, 'title', title);
	}

	fix() {
		return this.friendRepo.fix();
	}
}
