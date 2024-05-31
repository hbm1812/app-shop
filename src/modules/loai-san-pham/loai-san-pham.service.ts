import { Injectable, NotFoundException } from '@nestjs/common';
import { LoaiSanPham, LoaiSanPhamDocument } from './schemas/loai-san-pham.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LoaiSanPhamService {
    constructor(@InjectModel(LoaiSanPham.name) private loaiSanPhamModel: Model<LoaiSanPhamDocument>) { }
    async getAll(): Promise<LoaiSanPham[]> {
        return this.loaiSanPhamModel.find().exec();
    }

    async createLoaiSanPham(tenLoaiSanPham: string, status: string, icon: string): Promise<any> {
        const loai = new this.loaiSanPhamModel({ tenLoaiSanPham, status, icon });
        const result = await loai.save();
        const userObj = result.toObject();
        return userObj;
    }

    async update(body, _id): Promise<any> {
        const product = await this.loaiSanPhamModel.findByIdAndUpdate(_id, body);
        return product;
    }

    async delete(_id): Promise<any> {
        const product = await this.loaiSanPhamModel.findByIdAndDelete(_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return'Deleted successfully';
    }


}
