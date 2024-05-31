import { Module } from '@nestjs/common';
import { DmSanPhamService } from './dm-san-pham.service';
import { DmSanPhamController } from './dm-san-pham.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DMSanPham, DMSanPhamSchema } from './schemas/dm-san-pham.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: DMSanPham.name, schema: DMSanPhamSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  providers: [DmSanPhamService],
  controllers: [DmSanPhamController],
  exports:[DmSanPhamService, JwtModule]
})
export class DmSanPhamModule {}
