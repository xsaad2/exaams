import { Module } from '@nestjs/common';
import { ExaamsBackendAuthenticationModule } from '@com.language.exams/exaams-backend/authentication';
import { ExaamsBackendExamModule } from '@com.language.exams/exaams-backend/exam/feature';

@Module({
  imports: [ExaamsBackendAuthenticationModule, ExaamsBackendExamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
