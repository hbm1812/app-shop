import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DMSanPhamDocument = DMSanPham & Document;
@Schema()
export class DMSanPham {

  @Prop({ required: true })
  tenDMSanPham: string;

  @Prop({ required: true})
  image: string;
}

export const DMSanPhamSchema = SchemaFactory.createForClass(DMSanPham);