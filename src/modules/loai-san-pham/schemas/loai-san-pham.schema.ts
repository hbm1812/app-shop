import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoaiSanPhamDocument = LoaiSanPham & Document;
@Schema()
export class LoaiSanPham {

  @Prop({ required: true, unique: true })
  tenLoaiSanPham: string;

  @Prop({ required: true, unique: true })
  status: string;

  @Prop({ required: true, unique: true })
  icon: string;
}

export const LoaiSanPhamSchema = SchemaFactory.createForClass(LoaiSanPham);