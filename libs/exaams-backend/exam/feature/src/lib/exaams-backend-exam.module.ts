import { Module } from '@nestjs/common';
import { ExaamController } from './exaam.contoller';
import { B1ExaamService } from './b1-exaam.service';
import { PrismaService } from '@com.language.exams/exaams-backend/utils';
import { B1AttemptService } from './b1-attempt.service';
import { B1AttemptsController } from './b1-attempts-controller';

@Module({
  controllers: [ExaamController, B1AttemptsController],
  providers: [B1ExaamService, B1AttemptService, PrismaService],
  imports: [],
  exports: [],
})
export class ExaamsBackendExamModule {}
