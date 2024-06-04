import { Injectable, NotFoundException } from '@nestjs/common';
import { ChiTietDonHang, ChiTietDonHangDocument } from './schemas/chi-tiet-don-hang.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChiTietDonHangService {
    constructor(@InjectModel(ChiTietDonHang.name) private chiTietDonHangModel: Model<ChiTietDonHangDocument>) { }
    async getAll(): Promise<ChiTietDonHang[]> {
        return this.chiTietDonHangModel.find().exec();
    }

    async findById(id_donHang: string): Promise<any> {
        return this.chiTietDonHangModel.findById({ id_donHang }).lean().exec();
    }



    async create(id_donHang: string, id_sanPham: string, soLuong: string, tongTien: string, gia: string, thanhTien: string, khuyenMai: string): Promise<any> {
        const loai = new this.chiTietDonHangModel({ id_donHang, id_sanPham, soLuong, tongTien, gia, thanhTien, khuyenMai });
        const result = await loai.save();
        const Obj = result.toObject();
        return Obj;
    }

    async update(body, _id): Promise<any> {
        const product = await this.chiTietDonHangModel.findByIdAndUpdate(_id, body);
        return product;
    }

    async delete(_id): Promise<any> {
        const product = await this.chiTietDonHangModel.findByIdAndDelete(_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        else {
            const del = this.chiTietDonHangModel.findOne({ _id }).lean().exec();
            if (del) {
                return "Xóa thành công!";
            }
            return "Xóa thất bại!";
        }
    }
}
