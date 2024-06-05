import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;
@Schema()
export class Product {

    @Prop({ required: true})
    tenSanPham: string;

    @Prop({ required: true})
    moTa: string;

  @Prop({ required: true})
  giaBan: string;

  @Prop({ required: true})
  giaGiam: string;

  @Prop({ required: true})
  hinhAnh: [];

  @Prop({ required: true})
  loaiSanPham: string;

  @Prop({ required: true})
  thuongHieu: string;

  @Prop({ required: true})
  kichThuoc: [];
  @Prop({ required: true })
  mauSac: string;
  @Prop({ required: true })
  soLuong: number;

  @Prop({ required: true})
  trangThai: string;

  @Prop({ required: true})
  ngayTao: Date;

  @Prop({ required: true })
  ngayCapNhat: Date;

  @Prop({ required: true})
  code: string;

  @Prop({ required: true})
  sanPhamMoi: boolean;

  @Prop({ required: true})
  giaNhapHang: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);