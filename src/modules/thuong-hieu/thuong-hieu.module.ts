import { Module } from '@nestjs/common';
import { ThuongHieuController } from './thuong-hieu.controller';
import { ThuongHieuService } from './thuong-hieu.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ThuongHieu, ThuongHieuSchema } from './schemas/thuong-hieu.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: ThuongHieu.name, schema: ThuongHieuSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  controllers: [ThuongHieuController],
  providers: [ThuongHieuService],
  exports:[ThuongHieuService, JwtModule]
})
export class ThuongHieuModule {}
