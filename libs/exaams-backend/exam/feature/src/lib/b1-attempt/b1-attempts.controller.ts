import { Body, Controller, Get, Post } from '@nestjs/common';
import { B1AttemptService } from './b1-attempt.service';
import { B1AnswersForm } from '@com.language.exams/exaams-backend/utils';

@Controller('attempts')
export class B1AttemptsController {
  constructor(private readonly b1AttemptService: B1AttemptService) {}

  @Post()
  async createOrUpdateB1Attempt(@Body() formAnswers: B1AnswersForm) {
    try {
      return await this.b1AttemptService.createOrUpdateExamAttempt(
        'saad.belkhou@gmail.com',
        formAnswers.examId,
        formAnswers
      );
    } catch (e) {
      console.error('Error while creating B1 Attempt', e);
      return e;
    }
  }

  @Post('restart')
  async startNewB1Attempt(@Body() formAnswers: B1AnswersForm) {
    console.log('createB1Attempt');
    try {
      return await this.b1AttemptService.createExamAttempt(
        'saad.belkhou@gmail.com',
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
    console.log('getExamAttempts');
    try {
      return await this.b1AttemptService.getExamAttempts();
    } catch (e) {
      console.error('Error while getting Exam Attempts', e);
      return e;
    }
  }

  @Get('latest')
  async getLatestExamAttempt(@Body() body: any) {
    console.log('getLatestExamAttempt', body);
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
}
