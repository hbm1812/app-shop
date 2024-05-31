import { Controller, UseGuards,Request,Get, Post,Body } from '@nestjs/common';
import { DmSanPhamService } from './dm-san-pham.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('dm-san-pham')
export class DmSanPhamController {
    constructor(private readonly dmSanPhamService: DmSanPhamService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('Super admin')
    @Get()
    async getAll(@Request() req) {
        return this.dmSanPhamService.getAll();
    }   

    // @Roles('Super admin')
    @Post()
    async create(@Body() themDMSanPham: { tenDMSanPham: string, image:string }) {
        return this.dmSanPhamService.createDMSanPham(themDMSanPham.tenDMSanPham,themDMSanPham.image );
    }
}
