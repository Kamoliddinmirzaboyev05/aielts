import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async evaluateWriting(task: string, submission: string) {
    const prompt = `
      You are an expert IELTS examiner. Evaluate the following IELTS Writing submission based on the official criteria:
      1. Task Response
      2. Coherence and Cohesion
      3. Lexical Resource
      4. Grammatical Range and Accuracy

      Task Description: ${task}
      
      Student Submission: ${submission}

      Provide your evaluation in JSON format with the following structure:
      {
        "overallBand": 6.5,
        "criteriaScores": {
          "taskResponse": { "score": 6.5, "feedback": "detailed feedback" },
          "coherenceCohesion": { "score": 6.5, "feedback": "detailed feedback" },
          "lexicalResource": { "score": 6.5, "feedback": "detailed feedback" },
          "grammaticalRangeAccuracy": { "score": 6.5, "feedback": "detailed feedback" }
        },
        "expertFeedback": "overall summary",
        "improvedVersion": "improved text"
      }

      Return ONLY valid JSON without any markdown formatting or code blocks.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();
      
      // Remove markdown code blocks if present
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      }
      
      return { 
        error: 'Failed to parse AI response',
        overallBand: 0,
        criteriaScores: {},
        expertFeedback: 'Evaluation failed'
      };
    } catch (error) {
      console.error('Gemini Eval Error:', error);
      throw new Error('Evaluation failed');
    }
  }
}
