import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MauSac, MauSacDocument } from './schemas/mau-sac.schema';
import { Model } from 'mongoose';

@Injectable()
export class MauSacService {

    constructor(@InjectModel(MauSac.name) private mauSacModel: Model<MauSacDocument>) { }
    
    async getAll(): Promise<MauSac[]> {
        return this.mauSacModel.find().exec();
    }


    async create(mauSac:string): Promise<any> {
        const loai = new this.mauSacModel({ mauSac });
        const result = await loai.save();
        const Obj = result.toObject();
        return Obj;
    }

    async update(body, _id): Promise<any> {
        const product = await this.mauSacModel.findByIdAndUpdate(_id, body);
        return product;
    }

    async delete(_id): Promise<any> {
        const product = await this.mauSacModel.findByIdAndDelete(_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        else{
            const delPr= this.mauSacModel.findOne({ _id }).lean().exec();
            if(delPr){
                return "Xóa thành công!";
            }
            return "Xóa thất bại!";
        }
       
    }
}
