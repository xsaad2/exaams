import { Module } from '@nestjs/common';
import { ExaamController } from './exaam.contoller';
import { B1ExaamService } from './b1-exaam.service';
import { PrismaService } from '@com.language.exams/exaams-backend/utils';

@Module({
  controllers: [ExaamController],
  providers: [B1ExaamService, PrismaService],
  imports: [],
  exports: [],
})
export class ExaamsBackendExamModule { }
