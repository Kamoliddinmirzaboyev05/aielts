import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common"
import { IeltsService } from "./ielts.service"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"

@Controller("ielts")
export class IeltsController {
  constructor(private readonly ieltsService: IeltsService) {}

  @UseGuards(JwtAuthGuard)
  @Get("stats")
  async getStats(@Req() req: any) {
    const userId = req.user.sub || req.user.id
    return await this.ieltsService.getUserStats(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get("scores")
  async getScores(@Req() req: any) {
    const userId = req.user.sub || req.user.id
    return await this.ieltsService.getUserScores(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Post("submit-score")
  async submitScore(@Req() req: any, @Body() data: any) {
    const userId = req.user.sub || req.user.id
    return await this.ieltsService.submitScore(userId, data.testId, data.section, data.score, data.feedback)
  }

  @UseGuards(JwtAuthGuard)
  @Post("evaluate-writing")
  async evaluateWriting(@Req() req: any, @Body() data: { task: string; submission: string }) {
    const userId = req.user.sub || req.user.id
    return await this.ieltsService.evaluateWriting(userId, data.task, data.submission)
  }
}
