import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoaiSanPhamDocument = LoaiSanPham & Document;
@Schema()
export class LoaiSanPham {

  @Prop({ required: true })
  tenLoaiSanPham: string;

  @Prop({ required: true})
  status: string;

  @Prop({ required: true})
  icon: string;
}

export const LoaiSanPhamSchema = SchemaFactory.createForClass(LoaiSanPham);