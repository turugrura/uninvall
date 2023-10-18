import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { RoScriptTranslatorService } from './ro-script-translator.service';

@Controller('ro-script-translator')
export class RoScriptTranslatorController {
	constructor(private roService: RoScriptTranslatorService) {}

	@Put('syncAll')
	syncAll() {
		return this.roService.syncAll();
	}

	@Post('test-post')
	postTest(@Body() a: any) {
		if (a?.length === 0) {
			return this.roService.syncAll();
		}

		return this.roService.loadItems(a.itemIds);
	}

	@Post('monster')
	loadMonster(@Body() a: any) {
		return this.roService.loadMonster(a.itemIds);
	}

	@Post('loadImage')
	loadImage(@Body() a: any) {
		return this.roService.loadImage(a.itemIds);
	}

	@Delete('test-delete')
	deleteTest() {
		return { del: 'OK' };
	}
}
