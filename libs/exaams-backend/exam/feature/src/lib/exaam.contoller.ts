import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ExaamService } from './exaam.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

// This is a hack to make Multer available in the Express namespace
import { ReadingTaskFiles } from '@com.language.exams/exaams-backend/utils';

type File = Express.Multer.File;

@Controller('exaams')
export class ExaamController {
  constructor(private readonly serviceNameService: ExaamService) {
  }


  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      // { name: 'readingTask1Image', maxCount: 1 },
      // { name: 'readingTask2aImage', maxCount: 1 },
      // { name: 'readingTask2bImage', maxCount: 1 },
      { name: 'readingTask3Image', maxCount: 1 },
      // { name: 'readingTask4Image', maxCount: 1 },
      // { name: 'readingTask5Image', maxCount: 1 },
      { name: 'audioTrack', maxCount: 1 }
    ])
  )
  async createExam(
    @Body('data') examData: any,
    @UploadedFiles() files: ReadingTaskFiles
  ) {
    try {
      if (!files || !files.audioTrack || !files.audioTrack[0]) {
        console.log('Audio track file is missing');
      }

      const exaam = JSON.parse(examData);
      const res =  await this.serviceNameService.createExaam(exaam, files);
      console.log('res', res);
      return res;
    } catch (e) {
      throw new Error('Error while creating Exam', {cause: e});
    }
  }

  @Get()
  async getExaams() {
    console.log('getExaams');
    try {
      return await this.serviceNameService.getAllExaams();
    } catch (e) {
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
