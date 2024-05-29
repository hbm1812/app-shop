import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ObjectId } from 'mongoose';
import { responseData } from 'src/common/responseData.util';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() createUserDto: { username: string; password: string },
  ) {
    return this.usersService.createUser(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'Super admin')
  @Get()
  async findAll(@Request() req) {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin', 'Super admin')

  
  @Post('roleId')
  async findAllByRoleId(@Body() body: { roleId: string; username: string }) {
    return this.usersService.findAllByRoleId(body.roleId, body.username);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'Super admin')
  
  @Post('search')
  async searchUser(
    @Body() body: { roleId?: string; search?: string; page?: number; size?: number },
    @Res() res: Response,
  ) {
    const { roleId, search, page = 1, size = 10 } = body;

    try {
      const result = await this.usersService.searchUser(roleId, search, page, size);
      return responseData(res, result, HttpStatus.OK, 'Success');
    } catch (err) {
      return responseData(res, null, HttpStatus.BAD_REQUEST, err.message);
    }
  }

}
