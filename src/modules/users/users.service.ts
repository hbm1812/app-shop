import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { query } from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async createUser(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    const result = await user.save();
    const userObj = result.toObject();
    delete userObj.password;
    return userObj;
  }

  async findOne(username: string): Promise<any> {
    return this.userModel.findOne({ username }).lean().exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


  async searchUser(roleId?: string, search?: string, page: number = 1, size: number = 10): Promise<any> {
    const searchValue: any = { $or: [] };

    if (search) {
      searchValue.$or.push({ username: { $regex: search, $options: "i" } });
    }

    if (roleId) {
      searchValue.$or.push({ role: roleId });
    }

    if (searchValue.$or.length === 0) {
      delete searchValue.$or;
    }

    const users = await this.userModel.find(searchValue)
      .populate('role')
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    const total = await this.userModel.countDocuments(searchValue).exec();
    return { users, total, page, size };
  }

  async findAllByRoleId(roleId: string, username: string): Promise<User[]> {

    const query: any = {};
    if (roleId) {
      query['roleId'] = roleId;
    }
    if (username) {
      query['username'] = username;
    }
    if (roleId && username) {
      query['roleId'] = roleId;
      query['username'] = username;
    }
    return this.userModel.find(query).populate("role", "username").exec();
  }

}
