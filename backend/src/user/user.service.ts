import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserProfessionalDto } from './dto/update-user-professional.dto';
import { UpdateUserDto } from './dto/update-user.dts';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // Hasheia a senha com bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, // Armazena a senha hasheada
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateUserProfessional(
    id: number,
    updateUserProfessional: UpdateUserProfessionalDto,
  ) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserProfessional,
    });
  }

  async getUserProfessional(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        experiences: true,
        education: true,
        tools: true,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        school: true,
        init_date_school: true,
        end_date_school: true,
        experiences: true,
        education: true,
        tools: true,
        portfolio_url: true,
        createdAt: true,
        password: true,
      },
    });
  }
  async updatePassword(id: number, newPassword: string): Promise<User> {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const isPasswordEqual = await bcrypt.compare(newPassword, user.password);
    if (isPasswordEqual) {
      throw new Error('A nova senha não pode ser igual à senha atual.');
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      return this.prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
    }
  }
}
