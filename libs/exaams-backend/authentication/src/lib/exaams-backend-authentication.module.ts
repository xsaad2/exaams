import { Global, Module } from '@nestjs/common';
import { initializeApp } from 'firebase-admin/app';
import { environment } from '@com.language.exams/exaams/utils';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@com.language.exams/exaams-backend/utils';

@Global()
@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return initializeApp(environment.firebase);
      },
    },
    UserService,
    PrismaService,
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class ExaamsBackendAuthenticationModule {}
