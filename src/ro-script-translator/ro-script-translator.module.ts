import { Module } from "@nestjs/common";
import { RoScriptTranslatorService } from "./ro-script-translator.service";

@Module({
  controllers: [],
  providers: [RoScriptTranslatorService],
  
})
export class RoScriptTranslatorModule {}