import { Injectable, NotFoundException } from '@nestjs/common';
import { KichThuoc, KichThuocDocument } from './schemas/kich-thuoc.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class KichThuocService {
    constructor(@InjectModel(KichThuoc.name) private kichThuocModel: Model<KichThuocDocument>) { }
    
    async getAll(): Promise<KichThuoc[]> {
        return this.kichThuocModel.find().exec();
    }

    async create(kichThuoc: string): Promise<any> {
        const loai = new this.kichThuocModel({ kichThuoc });
        const result = await loai.save();
        const Obj = result.toObject();
        return Obj;
    }

    async update(body, _id): Promise<any> {
        const product = await this.kichThuocModel.findByIdAndUpdate(_id, body);
        return product;
    }

    async delete(_id): Promise<any> {
        const product = await this.kichThuocModel.findByIdAndDelete(_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        else{
            const delPr= this.kichThuocModel.findOne({ _id }).lean().exec();
            if(delPr){
                return "Xóa thành công!";
            }
            return "Xóa thất bại!";
        }
       
    }

}
