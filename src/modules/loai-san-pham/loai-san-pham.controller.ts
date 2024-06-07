import { Controller, UseGuards, Request, Get, Post, Body, Put, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import { LoaiSanPhamService } from './loai-san-pham.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Response } from 'express';
import { responseData } from 'src/common/responseData.util';


@Controller('loai-san-pham')
export class LoaiSanPhamController {
    constructor(private readonly loaiSanPhamService: LoaiSanPhamService) { }
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.loaiSanPhamService.getAll();
    }

    // @Roles('Super admin')
    @Post()
    async create(@Body() themLoaiSanPham: { tenLoaiSanPham: string, status:string, icon: string }) {
        return this.loaiSanPhamService.createLoaiSanPham(themLoaiSanPham.tenLoaiSanPham, themLoaiSanPham.status, themLoaiSanPham.icon);
    }


 // @Roles('Super admin')
    @Put('/:id')
    async update(
        @Body() body: { tenLoaiSanPham: string; status?: string; icon: string },
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
    
        try {
          const result = await this.loaiSanPhamService.update(body, _id);
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
          const result = await this.loaiSanPhamService.delete( _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }
      
}
