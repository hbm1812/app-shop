import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KhachHangDocument = KhachHang & Document;
@Schema()
export class KhachHang {

  @Prop({ required: true, unique: true })
  hoTen: string;

  @Prop({ required: true, unique: true })
  soDienThoai: string;          a

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  ngayTaoTaiKhoan: Date;
}

export const KhachHangSchema = SchemaFactory.createForClass(KhachHang);