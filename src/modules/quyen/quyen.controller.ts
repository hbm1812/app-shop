import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { QuyenService } from './quyen.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import {Roles} from '../auth/roles.decorator'

@Controller('quyen')
export class QuyenController {
    constructor(private readonly quyenService: QuyenService) { }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.quyenService.getAll();
    }

    
    @Roles('Super admin')
    @Post()
    async them(@Body() themQuyenDto: { role: string }) {
       
        return this.quyenService.themQuyen(themQuyenDto.role );
    }

}
