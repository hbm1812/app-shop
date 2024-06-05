import { Controller, UseGuards, Request, Get, Post, Body, Put, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import { KichThuocService } from './kich-thuoc.service';
import { Response } from 'express';
import { responseData } from 'src/common/responseData.util';

@Controller('kich-thuoc')
export class KichThuocController {
    constructor(private readonly kichThuocService: KichThuocService) { }
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.kichThuocService.getAll();
    }

    // @Roles('Super admin')
    @Post()
    async create(@Body() body: { kichThuoc: string }) {
        return this.kichThuocService.create(body.kichThuoc);
    }


 // @Roles('Super admin')
    @Put('/:id')
    async update(
        @Body() body: { kichThuoc: string },
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
    
        try {
          const result = await this.kichThuocService.update(body, _id);
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
          const result = await this.kichThuocService.delete( _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }
}
