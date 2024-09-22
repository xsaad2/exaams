import { Injectable } from '@nestjs/common';
import { PrismaService } from '@com.language.exams/exaams-backend/utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
