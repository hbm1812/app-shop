import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quyen, QuyenDocument } from './schemas/quyen.schema';

@Injectable()
export class QuyenService {
    constructor(@InjectModel(Quyen.name) private quyenModel: Model<QuyenDocument>) { }

    async getAll(): Promise<Quyen[]> {
        return this.quyenModel.find().exec();
    }

    async themQuyen(role: string): Promise<any> {
        const userRole = new this.quyenModel({role});
        const result = await userRole.save();
        const userObj = result.toObject();
        return userObj;
      }
      
      async findById(_id: string): Promise<any> {
        return this.quyenModel.findOne({ _id }).lean().exec();
      }


      async update(body, _id): Promise<any> {
        const product = await this.quyenModel.findByIdAndUpdate(_id, body);
        return product;
    }

    async delete(_id): Promise<any> {
        const product = await this.quyenModel.findByIdAndDelete(_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        else{
            const delPr= this.quyenModel.findOne({ _id }).lean().exec();
            if(delPr){
                return "Xóa thành công!";
            }
            return "Xóa thất bại!";
        }
       
    }
      
}
