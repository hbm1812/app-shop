import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KhachHang, KhachHangDocument } from './schemas/khach-hang.schema';
import { Model } from 'mongoose';

@Injectable()
export class KhachHangService {
    constructor(@InjectModel(KhachHang.name) private khachHangModel: Model<KhachHangDocument>) { }
    async getAll(): Promise<KhachHang[]> {
        return this.khachHangModel.find().exec();
    }

    async create(hoTen: string, soDienThoai: string, email: string, ngayTaoTaiKhoan: Date): Promise<any> {
        const loai = new this.khachHangModel({ hoTen, soDienThoai, email, ngayTaoTaiKhoan });
        const result = await loai.save();
        const Obj = result.toObject();
        return Obj;
    }

    async update(body, _id): Promise<any> {
        const product = await this.khachHangModel.findByIdAndUpdate(_id, body);
        return product;
    }

    async delete(_id): Promise<any> {
        const product = await this.khachHangModel.findByIdAndDelete(_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        else{
            const delPr= this.khachHangModel.findOne({ _id }).lean().exec();
            if(delPr){
                return "Xóa thành công!";
            }
            return "Xóa thất bại!";
        }
       
    }
}
