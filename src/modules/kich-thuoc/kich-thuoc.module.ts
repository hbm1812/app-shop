import { Module } from '@nestjs/common';
import { KichThuocController } from './kich-thuoc.controller';
import { KichThuocService } from './kich-thuoc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KichThuoc, KichThuocSchema } from './schemas/kich-thuoc.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: KichThuoc.name, schema: KichThuocSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  controllers: [KichThuocController],
  providers: [KichThuocService]
})
export class KichThuocModule {}
