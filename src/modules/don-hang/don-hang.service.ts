import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DonHang, DonHangDocument } from './schemas/don-hang.schema';
import { Model } from 'mongoose';

@Injectable()
export class DonHangService {
    constructor(@InjectModel(DonHang.name) private donHangModel: Model<DonHangDocument>) { }
    async getAll(): Promise<DonHang[]> {
        return this.donHangModel.find().exec();
    }

    async findOne(id_khachHang: string): Promise<any> {
        return this.donHangModel.findOne({ id_khachHang }).lean().exec();
      }

    async create(id_khachHang: string, ngayDatHang: Date, trangThaiDonHang: string, tongTien:string, phuongThucThanhToan: string, ghiChu:string): Promise<any> {
        const loai = new this.donHangModel({ id_khachHang, ngayDatHang, trangThaiDonHang, tongTien, phuongThucThanhToan, ghiChu});
        const result = await loai.save();
        const Obj = result.toObject();
        return Obj;
    }

    async update(body, _id): Promise<any> {
        const product = await this.donHangModel.findByIdAndUpdate(_id, body);
        return product;
    }

    async delete(_id): Promise<any> {
        const product = await this.donHangModel.findByIdAndDelete(_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        else{
            const delPr= this.donHangModel.findOne({ _id }).lean().exec();
            if(delPr){
                return "Xóa thành công!";
            }
            return "Xóa thất bại!";
        }    
    }
}
