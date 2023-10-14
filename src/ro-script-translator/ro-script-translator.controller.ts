import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { RoScriptTranslatorService } from './ro-script-translator.service';

@Controller('ro-script-translator')
export class AppController {
  constructor(private roService: RoScriptTranslatorService) {}

  @Put('syncAll')
  syncAll() {
    return this.roService.syncAll();
  }

  @Post('test-post')
  postTest(@Body() a: any) {
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
