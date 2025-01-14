import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dts';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updatePassword(id: number, newPassword: string): Promise<User> {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    if (user.password != newPassword) {
      // Hasheia a senha com bcrypt
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      return this.prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
    } else {
      throw new Error('A senha atual e a nova senha são iguais.');
    }
  }
}
