import { Controller, UseGuards, Request, Get, Post, Body, Put, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import { MauSacService } from './mau-sac.service';
import { responseData } from 'src/common/responseData.util';
import { Response } from 'express';

@Controller('mau-sac')
export class MauSacController {

    constructor(private readonly mauSacService: MauSacService) { }
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.mauSacService.getAll();
    }

    // @Roles('Super admin')
    @Post()
    async create(@Body() body: { mauSac: string }) {
        return this.mauSacService.create(body.mauSac);
    }

 // @Roles('Super admin')
    @Put('/:id')
    async update(
        @Body() body: { mauSac:string },
        @Param('id') _id:string,
        @Res() res: Response,
      ) {
    
        try {
          const result = await this.mauSacService.update(body, _id);
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
          const result = await this.mauSacService.delete( _id);
          return responseData(res, result, HttpStatus.OK, 'Success');
        } catch (err) {
          return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
        }
      }
}
