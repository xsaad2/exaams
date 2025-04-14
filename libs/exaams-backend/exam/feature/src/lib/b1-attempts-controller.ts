import { Body, Controller, Get, Post } from '@nestjs/common';
import { B1AttemptService } from './b1-attempt.service';
import { B1AnswersForm } from '../../../../utils/src';

@Controller('attempts')
export class B1AttemptsController {
  constructor(private readonly b1AttemptService: B1AttemptService) {}

  @Post()
  async createB1Attempt(@Body() formAnswers: B1AnswersForm) {
    console.log('createB1Attempt');
    try {
      return await this.b1AttemptService.createExamAttempt(
        'saad.belkhou@gmail.com',
        'cm9c1wmy60026bl1obswu27x3',
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
}
