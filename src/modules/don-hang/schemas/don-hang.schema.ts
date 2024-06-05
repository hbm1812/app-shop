import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DonHangDocument = DonHang & Document;
@Schema()
export class DonHang {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'khachhangs', default: 'ObjectId của role user mặc định' })
    id_khachHang: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  ngayDatHang: Date;

  @Prop({ required: true})
  trangThaiDonHang: string;

  @Prop({ required: true})
  tongTien: string;

  @Prop({ required: true })
  phuongThucThanhToan: string;

  @Prop({ required: true })
  ghiChu: string;

}

export const DonHangSchema = SchemaFactory.createForClass(DonHang);