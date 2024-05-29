import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Quyen, QuyenSchema } from '../quyen/schemas/quyen.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  MongooseModule.forFeature([{ name: Quyen.name, schema: QuyenSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, JwtModule],
})
export class UsersModule {}
