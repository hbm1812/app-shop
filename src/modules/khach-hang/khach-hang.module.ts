import { Module } from '@nestjs/common';
import { KhachHangController } from './khach-hang.controller';
import { KhachHangService } from './khach-hang.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KhachHang, KhachHangSchema } from './schemas/khach-hang.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: KhachHang.name, schema: KhachHangSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  controllers: [KhachHangController],
  providers: [KhachHangService],
  exports:[KhachHangService, JwtModule]
})
export class KhachHangModule {}
