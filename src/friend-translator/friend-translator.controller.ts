import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatchSentenceRequest } from './dtos/patch-sentence.request';
import { UpdateTitleRequest } from './dtos/update-title.request';
import { FriendTranslatorService } from './friend-translator.service';

@Controller('friend_translators')
export class FriendTranslatorController {
	constructor(private friendService: FriendTranslatorService) {}

	@Get()
	getList() {
		return this.friendService.getList();
	}

	@Get(':ss/:ep')
	getEp(@Param('ss') ss: string, @Param('ep') ep: string) {
		return this.friendService.getEpisode(+ss, +ep);
	}

	@Post('title')
	updateTitle(@Body() request: UpdateTitleRequest) {
		return this.friendService.updateTitle(request);
	}

	@Post('sentences')
	updateSentence(@Body() request: PatchSentenceRequest) {
		return this.friendService.patchSentence(request);
	}

	@Post('fix')
	fix() {
		// return this.friendService.fix();
		return { isFixed: true };
	}
}
