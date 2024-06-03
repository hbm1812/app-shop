import { Module } from '@nestjs/common';
import { DonHangController } from './don-hang.controller';
import { DonHangService } from './don-hang.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DonHang, DonHangSchema } from './schemas/don-hang.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DonHang.name, schema: DonHangSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  controllers: [DonHangController],
  providers: [DonHangService],
  exports:[DonHangService, JwtModule]
})
export class DonHangModule {}
