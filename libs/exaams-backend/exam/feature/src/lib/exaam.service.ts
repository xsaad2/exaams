import { PrismaService } from 'libs/exaams-backend/utils/src';
import { Injectable } from '@nestjs/common';
import { Exam } from '@prisma/client';

@Injectable()
export class ExaamService {
  constructor(private prismaService: PrismaService) {}

  async createExaam(exaam: Exam) {
    return this.prismaService.exam.create({
      data: exaam,
    });
  }
}
