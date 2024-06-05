import { Module } from '@nestjs/common';
import { MauSacController } from './mau-sac.controller';
import { MauSacService } from './mau-sac.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MauSac, MauSacSchema } from './schemas/mau-sac.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: MauSac.name, schema: MauSacSchema }]),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: '60m' },
  }),],
  controllers: [MauSacController],
  providers: [MauSacService]
})
export class MauSacModule {}
