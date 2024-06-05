import { Controller, Get, Post, Body, UseGuards, Request, Put, Delete, Param, Res, HttpStatus } from '@nestjs/common';
import { QuyenService } from './quyen.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import {Roles} from '../auth/roles.decorator'
import { responseData } from 'src/common/responseData.util';
import { Response } from 'express';

@Controller('quyen')
export class QuyenController {
    constructor(private readonly quyenService: QuyenService) { }


    @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.quyenService.getAll();
    }

    
    @Roles('Super admin')
    @Post()
    async them(@Body() themQuyenDto: { role: string }) {
       
        return this.quyenService.themQuyen(themQuyenDto.role );
    }

    // @Roles('Super admin')
    @Put('/:id')
    async update(
        @Body() body: { tenLoaiSanPham: string; status?: string; icon: string },
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
    
        try {
          const result = await this.quyenService.update(body, _id);
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
          const result = await this.quyenService.delete( _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }

}
