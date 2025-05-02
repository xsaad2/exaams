import { Injectable } from '@nestjs/common';
import { PrismaService } from '@com.language.exams/exaams-backend/utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  persistFirebaseUser(email: string, id: string) {
    return this.prisma.user.create({
      data: {
        id: id,
        email: email,
      },
    });
  }

  checkIfUserExists(email: string, id: string) {
    return this.prisma.user.count({
      where: {
        id,
        email,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
