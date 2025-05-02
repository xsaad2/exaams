import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { B1AttemptService } from './b1-attempt.service';
import { B1AnswersForm } from '@com.language.exams/exaams-backend/utils';
import { DbUser } from '@com.language.exams/exaams-backend/authentication';
import { User } from '@prisma/client';

@Controller('attempts')
export class B1AttemptsController {
  constructor(private readonly b1AttemptService: B1AttemptService) {}

  @Post()
  async createOrUpdateB1Attempt(
    @DbUser() user: User,
    @Body() formAnswers: B1AnswersForm
  ) {
    try {
      return await this.b1AttemptService.createOrUpdateExamAttempt(
        user.email,
        formAnswers.examId,
        formAnswers
      );
    } catch (e) {
      console.error('Error while creating B1 Attempt', e);
      return e;
    }
  }

  @Post('restart')
  async startNewB1Attempt(
    @DbUser() user: User,
    @Body() formAnswers: B1AnswersForm
  ) {
    try {
      return await this.b1AttemptService.createExamAttempt(
        user.email,
        formAnswers.examId,
        formAnswers
      );
    } catch (e) {
      console.error('Error while creating B1 Attempt', e);
      return e;
    }
  }

  @Get()
  async getB1ExamAttempts() {
    try {
      return await this.b1AttemptService.getExamAttempts();
    } catch (e) {
      console.error('Error while getting Exam Attempts', e);
      return e;
    }
  }

  @Get('latest')
  async getLatestExamAttempt(@Body() body: any) {
    try {
      return await this.b1AttemptService.getLatestExamAttemptByExamIdAndUserEmail(
        body.examId,
        body.userEmail
      );
    } catch (e) {
      console.error('Error while getting Latest Exam Attempt', e);
      return e;
    }
  }
  @Get('latest/:examId/:userEmail')
  async getLatestExamAttemptByExamIdAndUserEmail(
    @DbUser() user: User,
    @Param('examId') examId: string
  ) {
    try {
      return await this.b1AttemptService.getLatestExamAttemptByExamIdAndUserEmail(
        examId,
        user.email
      );
    } catch (e) {
      console.error('Error while getting Latest Exam Attempt', e);
      return e;
    }
  }
}
