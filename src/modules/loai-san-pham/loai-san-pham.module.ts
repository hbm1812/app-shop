import { Module } from '@nestjs/common';
import { LoaiSanPhamController } from './loai-san-pham.controller';
import { LoaiSanPhamService } from './loai-san-pham.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LoaiSanPham, LoaiSanPhamSchema } from './schemas/loai-san-pham.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: LoaiSanPham.name, schema: LoaiSanPhamSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  controllers: [LoaiSanPhamController],
  providers: [LoaiSanPhamService],
  exports:[LoaiSanPhamService, JwtModule]
})
export class LoaiSanPhamModule {}
