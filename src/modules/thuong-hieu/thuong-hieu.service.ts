import { Injectable, NotFoundException } from '@nestjs/common';
import { ThuongHieu, ThuongHieuDocument } from './schemas/thuong-hieu.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ThuongHieuService {
    constructor(@InjectModel(ThuongHieu.name) private thuongHieuModel: Model<ThuongHieuDocument>) { }
    
    async getAll(): Promise<ThuongHieu[]> {
        return this.thuongHieuModel.find().exec();
    }

    async createThuongHieu(tenThuongHieu: string, status: string, anh: string): Promise<any> {
        const loai = new this.thuongHieuModel({ tenThuongHieu, status, anh });
        const result = await loai.save();
        const Obj = result.toObject();
        return Obj;
    }

    async update(body, _id): Promise<any> {
        const product = await this.thuongHieuModel.findByIdAndUpdate(_id, body);
        return product;
    }

    async delete(_id): Promise<any> {
        const product = await this.thuongHieuModel.findByIdAndDelete(_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        else{
            const delPr= this.thuongHieuModel.findOne({ _id }).lean().exec();
            if(delPr){
                return "Xóa thành công!";
            }
            return "Xóa thất bại!";
        }
       
    }

}
