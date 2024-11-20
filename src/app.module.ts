import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OportunityModule } from './oportunity/oportunity.module';

@Module({
  imports: [UserModule, OportunityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
