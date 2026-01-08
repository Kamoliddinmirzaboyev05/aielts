import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestDto } from './dto/create-test.dto';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}

  async create(createTestDto: CreateTestDto, createdBy: string) {
    return this.prisma.test.create({
      data: {
        ...createTestDto,
        createdBy,
      },
    });
  }

  async findAll() {
    return this.prisma.test.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.test.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.test.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.test.delete({
      where: { id },
    });
  }
}
