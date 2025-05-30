import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { B1ExaamService } from './b1-exaam.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { B1AttemptService } from '../b1-attempt/b1-attempt.service';
import { ExamCatalogItem } from '@com.language.exams/exaams-backend/utils';
import { DbUser } from '@com.language.exams/exaams-backend/authentication';
import { User } from '@prisma/client';
import { AccessGuard } from '../../../../../authentication/src';

// This is a hack to make Multer available in the Express namespace

type File = Express.Multer.File;

@Controller('exaams')
export class ExaamController {
  constructor(
    private readonly b1ExaamService: B1ExaamService,
    private readonly b1AttemptService: B1AttemptService
  ) {}

  @Post()
  @UseGuards(new AccessGuard('saad.belkhou@gmail.com'))
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
      const res = await this.b1ExaamService.createB1Exaam(exaam, files);
      console.log('res', res);
      return res;
    } catch (e) {
      throw new InternalServerErrorException('Error while creating Exam', {
        cause: e,
      });
    }
  }

  @Get()
  async getExaams() {
    try {
      return await this.b1ExaamService.getAllExaams();
    } catch (e) {
      console.error('Error while getting Exaams', e);
      return e;
    }
  }

  @Get('/catalog')
  async getExaamCatalog(@DbUser() user: User): Promise<ExamCatalogItem[]> {
    try {
      return this.b1ExaamService.getExamsCatalog(user.email);
    } catch (e) {
      console.error('Error while getting Exaam', e);
      return e;
    }
  }

  @Get('/:nameOrId')
  async getExaam(@Param('nameOrId') nameOrId: string) {
    console.log('getExaamByNameOrId');
    try {
      return this.b1ExaamService.getExaamByNameOrId(nameOrId);
    } catch (e) {
      console.error('Error while getting Exaam', e);
      return e;
    }
  }
}
