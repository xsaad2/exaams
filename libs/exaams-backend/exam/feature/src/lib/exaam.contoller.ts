import { Body, Controller, Post } from '@nestjs/common';
import { ExaamService } from './exaam.service';
import { Exam } from '@prisma/client';

@Controller('exaams')
export class ExaamController {
  constructor(private readonly serviceNameService: ExaamService) {}

  @Post()
  async createExam(@Body() examData: Exam) {
    return await this.serviceNameService.createExaam(examData);
  }
}
