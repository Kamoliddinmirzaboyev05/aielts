import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { AiService } from "../ai/ai.service"

@Injectable()
export class IeltsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async evaluateWriting(userId: string, task: string, submission: string) {
    const evaluation = await this.aiService.evaluateWriting(task, submission)
    
    // Save the attempt and feedback automatically
    const attempt = await this.prisma.attempt.create({
      data: {
        userId,
        testId: task, // In writing evaluation, task is often the "testId" or prompt
        score: evaluation.overallBand || 0,
        feedback: {
          create: {
            overallBand: evaluation.overallBand || 0,
            taskResponse: evaluation.criteriaScores?.taskResponse?.feedback || "Evaluated",
            coherence: evaluation.criteriaScores?.coherenceCohesion?.feedback || "Evaluated",
            lexical: evaluation.criteriaScores?.lexicalResource?.feedback || "Evaluated",
            grammar: evaluation.criteriaScores?.grammaticalRangeAccuracy?.feedback || "Evaluated",
            modelAnswer: evaluation.expertFeedback,
          }
        }
      },
      include: { feedback: true }
    })

    return evaluation
  }

  async submitScore(userId: string, testId: string, section: string, score: number, feedback: string) {
    return this.prisma.attempt.create({
      data: {
        userId,
        testId,
        score,
        answers: feedback, // Using answers field to store feedback/data in this context
      }
    })
  }

  async getUserScores(userId: string) {
    return this.prisma.attempt.findMany({
      where: { userId },
      include: { test: true }
    })
  }

  async getUserStats(userId: string) {
    const attempts = await this.prisma.attempt.findMany({
      where: { userId },
      include: { test: true }
    })
    
    const scores = attempts.map(a => a.score || 0)
    
    return {
      totalTests: attempts.length,
      bestScore: scores.length > 0 ? Math.max(...scores) : 0,
      listening: 0, // Need precise filtering by test.type
      reading: 0,
      writing: 0,
      speaking: 0,
    }
  }
}
