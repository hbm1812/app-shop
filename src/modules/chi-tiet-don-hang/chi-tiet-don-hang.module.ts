import { Module } from '@nestjs/common';
import { ChiTietDonHangController } from './chi-tiet-don-hang.controller';
import { ChiTietDonHangService } from './chi-tiet-don-hang.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChiTietDonHang, ChiTietDonHangSchema } from './schemas/chi-tiet-don-hang.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: ChiTietDonHang.name, schema: ChiTietDonHangSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  controllers: [ChiTietDonHangController],
  providers: [ChiTietDonHangService],
  exports:[ChiTietDonHangService, JwtModule]
})
export class ChiTietDonHangModule {}
