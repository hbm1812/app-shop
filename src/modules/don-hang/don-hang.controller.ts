import { Controller, UseGuards, Request, Get, Post, Body, Put, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import { DonHangService } from './don-hang.service';
import { responseData } from 'src/common/responseData.util';
import { Response } from 'express';

@Controller('don-hang')
export class DonHangController {
    constructor(private readonly donHangService: DonHangService) { }
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.donHangService.getAll();
    }

    // @Roles('Super admin')
    @Get()
    async getOne( @Param('id') id_khachHang:string) {
        return this.getOne(id_khachHang);
    }

    // @Roles('Super admin')
    @Post()
    async create(@Body() body: {id_khachHang: string, trangThaiDonHang: string, tongTien:string, phuongThucThanhToan: string, ghiChu:string}) {
        const currentDate = new Date();
        return this.donHangService.create(body.id_khachHang, currentDate, body.trangThaiDonHang, body.tongTien, body.phuongThucThanhToan, body.ghiChu);
    }


 // @Roles('Super admin')
    @Put('/:id')
    async update(
        @Body() body: { id_khachHang: string, trangThaiDonHang: string, tongTien:string, phuongThucThanhToan: string, ghiChu:string },
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
    
        try {
          const result = await this.donHangService.update(body, _id);
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
          const result = await this.donHangService.delete( _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }
}
