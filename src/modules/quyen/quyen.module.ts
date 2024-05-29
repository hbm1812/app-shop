import { Module } from '@nestjs/common';
import { QuyenService } from './quyen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quyen, QuyenSchema } from './schemas/quyen.schema';
import { JwtModule } from '@nestjs/jwt';
import { QuyenController } from './quyen.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quyen.name, schema: QuyenSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  providers: [QuyenService],
  controllers: [QuyenController],
  exports: [QuyenService, JwtModule],
  
})
export class QuyenModule {}
