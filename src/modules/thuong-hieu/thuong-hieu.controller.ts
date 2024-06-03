import { Controller, UseGuards, Request, Get, Post, Body, Put, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import { ThuongHieuService } from './thuong-hieu.service';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { responseData } from 'src/common/responseData.util';
import { Response } from 'express';

@Controller('thuong-hieu')
export class ThuongHieuController {
    constructor(private readonly thuongHieuService: ThuongHieuService) { }
   
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')

    @Get()
    async getAll(@Request() req) {
        return this.thuongHieuService.getAll();
    }

    
     @Post()
     async create(@Body() body: { tenThuongHieu: string, status:string, anh: string }) {
         return this.thuongHieuService.createThuongHieu(body.tenThuongHieu, body.status, body.anh);
     } 

     // @Roles('Super admin')
    @Put('/:id')
    async update(
        @Body() body: { tenThuongHieu: string; status?: string; anh: string },
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
    
        try {
          const result = await this.thuongHieuService.update(body, _id);
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
          const result = await this.thuongHieuService.delete( _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }


}
