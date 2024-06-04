import { Controller, UseGuards, Request, Get, Post, Body, Put, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import { ChiTietDonHangService } from './chi-tiet-don-hang.service';
import { responseData } from 'src/common/responseData.util';
import { Response } from 'express';

@Controller('chi-tiet-don-hang')
export class ChiTietDonHangController {
    constructor(private readonly chiTietDonHangService: ChiTietDonHangService) { }
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.chiTietDonHangService.getAll();
    }

     // @Roles('Super admin')
     @Post('find')
     async findById( @Body() body:{id_donHang:string}) {
         return this.findById(body);
     }


    // @Roles('Super admin')
    @Post()
    async create(@Body() body: {id_donHang: string, id_sanPham: string, soLuong:string, tongTien: string, gia:string, thanhTien:string, khuyenMai:string}) {
        return this.chiTietDonHangService.create(body.id_donHang, body.id_sanPham, body.soLuong, body.tongTien, body.gia, body.thanhTien, body.khuyenMai);
    }
    


    // @Roles('Super admin')
    @Put('/:id')
    async update(
        @Body() body: { id_donHang: string, id_sanPham: string, soLuong:string, tongTien: string, gia:string, thanhTien:string, khuyenMai:string},
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
    
        try {
          const result = await this.chiTietDonHangService.update(body, _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }

    // @Roles('Super admin')
    @Delete('/:id')
    async delete(
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
        try {
          const result = await this.chiTietDonHangService.delete( _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }


}
