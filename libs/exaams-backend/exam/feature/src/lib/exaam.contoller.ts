import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { B1ExaamService } from './b1-exaam.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

// This is a hack to make Multer available in the Express namespace
import { ReadingTaskFiles } from '@com.language.exams/exaams-backend/utils';

type File = Express.Multer.File;

@Controller('exaams')
export class ExaamController {
  constructor(private readonly serviceNameService: B1ExaamService) {
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audioTrack', maxCount: 1 },
      { name: 'readingTask3Image', maxCount: 1 },
    ]) as any
  )
  async createExam(
    @Body('data') examData: any,
    @UploadedFiles() files: { [key: string]: File[] }
  ) {
    try {
      const exaam = JSON.parse(examData);
      const res = await this.serviceNameService.createB1Exaam(exaam, files);
      console.log('res', res);
      return res;
    } catch (e) {
      throw new InternalServerErrorException('Error while creating Exam', { cause: e });
    }
  }

  @Get()
  async getExaams() {
    console.log('getExaams');
    try {
      return await this.serviceNameService.getAllExaams();
    } catch (e) {
      console.error('Error while getting Exaams', e);
      return e;
    }
  }

  @Get('/:name')
  async getExaam(@Param('name') name: string) {
    try {
      console.log('getExaam', name);
      return this.serviceNameService.getExaamByName(name);
    } catch (e) {
      return e;
    }
  }

}
