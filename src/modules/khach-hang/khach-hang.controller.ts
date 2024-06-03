import { Controller, UseGuards, Request, Get, Post, Body, Put, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import { KhachHangService } from './khach-hang.service';
import { responseData } from 'src/common/responseData.util';
import { Response } from 'express';
@Controller('khach-hang')
export class KhachHangController {
    constructor(private readonly khachHangService: KhachHangService) { }
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.khachHangService.getAll();
    }

    // @Roles('Super admin')
    @Post()
    async create(@Body() body: { hoTen: string, soDienThoai: string, email: string,}) {
        const currentDate = new Date();
        return this.khachHangService.create(body.hoTen, body.soDienThoai, body.email, currentDate);
    }


 // @Roles('Super admin')
    @Put('/:id')
    async update(
        @Body() body: { hoTen: string, soDienThoai: string, email: string, ngayTaoTaiKhoan: Date},
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
    
        try {
          const result = await this.khachHangService.update(body, _id);
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
          const result = await this.khachHangService.delete( _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }
}
