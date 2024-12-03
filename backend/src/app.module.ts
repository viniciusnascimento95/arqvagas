import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; // Importing the AuthModule
import { OportunityModule } from './oportunity/oportunity.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, OportunityModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
