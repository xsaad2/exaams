import { Module } from '@nestjs/common';
import { ExaamsBackendAuthenticationModule } from '@com.language.exams/exaams-backend/authentication';

@Module({
  imports: [ExaamsBackendAuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
