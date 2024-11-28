import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service'; // Import UserService
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],

  providers: [AuthService, UserService, PrismaService], // Add UserService to providers
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
