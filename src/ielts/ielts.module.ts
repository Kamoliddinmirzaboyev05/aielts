import { Module } from "@nestjs/common"
import { IeltsService } from "./ielts.service"
import { IeltsController } from "./ielts.controller"
import { AiModule } from "../ai/ai.module"

@Module({
  imports: [AiModule],
  providers: [IeltsService],
  controllers: [IeltsController],
  exports: [IeltsService],
})
export class IeltsModule {}
