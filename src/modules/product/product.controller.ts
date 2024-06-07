import {
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Body,
  Put,
  Param,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { responseData } from 'src/common/responseData.util';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('Super admin')
  @Get()
  async getAll(@Request() req) {
    return this.productService.getAll();
  }

  // @Roles('Super admin')
  @Post()
  async create(
    @Body()
    body: {
      tenSanPham: string;
      moTa: string;
      giaBan: string;
      giaGiam: string;
      hinhAnh: [];
      loaiSanPham: string;
      thuongHieu: string;
      kichThuoc: string;
      mauSac: string;
      soLuong: number;
      trangThai: string;
      code: string;
      sanPhamMoi: boolean;
      giaNhapHang: string;
    },
  ) {
    const currentDate = new Date();
    return this.productService.create(
      body.tenSanPham,
      body.moTa,
      body.giaBan,
      body.giaGiam,
      body.hinhAnh,
      body.loaiSanPham,
      body.thuongHieu,
      body.kichThuoc,
      body.mauSac,
      body.soLuong,
      body.trangThai,
      currentDate,
      currentDate,
      body.code,
      body.sanPhamMoi,
      body.giaNhapHang,
    );
  }

  // @Roles('Super admin')
  @Put('/:id')
  async update(
    @Body()
    body: {
      tenSanPham: string;
      moTa: string;
      giaBan: string;
      giaGiam: string;
      hinhAnh: [];
      loaiSanPham: string;
      thuongHieu: string;
      kichThuoc: string;
      mauSac: string;
      soLuong: number;
      trangThai: string;
      ngayCapNhat: Date;
      code: string;
      sanPhamMoi: boolean;
      giaNhapHang: string;
    },
    @Param('id') _id: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.productService.update(body, _id);
      return responseData(res, result, HttpStatus.OK, 'Success');
    } catch (err) {
      return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
    }
  }

  // @Roles('Super admin')
  @Delete('/:id')
  async delete(@Param('id') _id: string, @Res() res: Response) {
    try {
      const result = await this.productService.delete(_id);
      return responseData(res, result, HttpStatus.OK, 'Success');
    } catch (err) {
      return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
    }
  }

  @Post('search')
  async searchUser(
    @Body()
    body: {
      tenSanPham?: string;
      loaiSanPham?: string;
      thuongHieu?: string;
      kichThuoc?: string;
      mauSac?: string;
      trangThai?: string;
      sanPhamMoi?: boolean;
      page?: number;
      size?: number;
    },
    @Res() res: Response,
  ) {
    const { tenSanPham, loaiSanPham, thuongHieu, kichThuoc, mauSac, trangThai, sanPhamMoi, page = 1, size = 10 } = body;

    try {
      const result = await this.productService.search(
        body,
        page,
        size,
      );
      return responseData(res, result, HttpStatus.OK, 'Success');
    } catch (err) {
      return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
    }
  }
}
