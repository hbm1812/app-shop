import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { QuyenModule } from './modules/quyen/quyen.module';
import { DmSanPhamModule } from './modules/dm-san-pham/dm-san-pham.module';
import { LoaiSanPhamModule } from './modules/loai-san-pham/loai-san-pham.module';
import { ThuongHieuModule } from './modules/thuong-hieu/thuong-hieu.module';
import { KhachHangModule } from './modules/khach-hang/khach-hang.module';
import { DonHangModule } from './modules/don-hang/don-hang.module';
import { ChiTietDonHangModule } from './modules/chi-tiet-don-hang/chi-tiet-don-hang.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    UsersModule,
    QuyenModule,
    AuthModule,
    DatabaseModule,
    DmSanPhamModule,
    LoaiSanPhamModule,
    ThuongHieuModule,
    KhachHangModule,
    DonHangModule,
    ChiTietDonHangModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
