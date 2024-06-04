import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;
@Schema()
export class Product {

    @Prop({ required: true, unique: true })
    tenSanPham: string;

    @Prop({ required: true, unique: true })
    moTa: string;

  @Prop({ required: true, unique: true })
  giaBan: string;

  @Prop({ required: true, unique: true })
  giaGiam: string;

  @Prop({ required: true, unique: true })
  hinhAnh: [];

  @Prop({ required: true, unique: true })
  loaiSanPham: string;

  @Prop({ required: true, unique: true })
  thuongHieu: string;

  @Prop({ required: true, unique: true })
  kichThuoc: [];
  @Prop({ required: true, unique: true })
  mauSac: string;
  @Prop({ required: true, unique: true })
  soLuong: number;

  @Prop({ required: true, unique: true })
  trangThai: string;

  @Prop({ required: true, unique: true })
  ngayTao: Date;

  @Prop({ required: true, unique: true })
  ngayCapNhat: Date;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, unique: true })
  sanPhamMoi: boolean;

  @Prop({ required: true, unique: true })
  giaNhapHang: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);