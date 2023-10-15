import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { RoScriptTranslatorController } from "./ro-script-translator.controller";
import { RoScriptTranslatorService } from "./ro-script-translator.service";

@Module({
  imports: [HttpModule.register({
    signal: AbortSignal.timeout(60_000),
    timeout: 60_000
  })],
  controllers: [RoScriptTranslatorController],
  providers: [RoScriptTranslatorService],
  
})
export class RoScriptTranslatorModule {}