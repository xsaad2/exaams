import { Module } from '@nestjs/common';
import { ExaamController } from './exaam.contoller';
import { ExaamService } from './exaam.service';
import { PrismaService } from '@com.language.exams/exaams-backend/utils';

@Module({
  controllers: [ExaamController],
  providers: [ExaamService, PrismaService],
  imports: [],
  exports: [],
})
export class ExaamsBackendExamModule {}
