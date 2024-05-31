import { Injectable } from '@nestjs/common';
import { DMSanPham, DMSanPhamDocument } from './schemas/dm-san-pham.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DmSanPhamService {
    constructor(@InjectModel(DMSanPham.name) private dmSanPhamModel: Model<DMSanPhamDocument>) { }

    async getAll(): Promise<DMSanPham[]> {
        return this.dmSanPhamModel.find().exec();
    }

    async createDMSanPham(tenDMSanPham:string, image:string): Promise<any> {
        const danhMuc = new this.dmSanPhamModel({tenDMSanPham,image});
        const result = await danhMuc.save();
        const userObj = result.toObject();
        return userObj;
      }

}
