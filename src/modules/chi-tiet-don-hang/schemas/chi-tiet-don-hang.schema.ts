import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ChiTietDonHangDocument = ChiTietDonHang & Document;
@Schema()
export class ChiTietDonHang {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'donhangs'})
    id_donHang: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'products' })
    id_sanPham: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  soLuong: number;

  @Prop({ required: true})
  tongTien: string;

  @Prop({ required: true})
  gia: string;

  @Prop({ required: true})
  thanhTien: string;

  @Prop({ required: true })
  khuyenMai: string;


}

export const ChiTietDonHangSchema = SchemaFactory.createForClass(ChiTietDonHang);