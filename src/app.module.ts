import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { QuyenModule } from './modules/quyen/quyen.module';


@Module({
  imports: [UsersModule, QuyenModule, AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
