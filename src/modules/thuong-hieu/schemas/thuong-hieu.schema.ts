import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThuongHieuDocument = ThuongHieu & Document;
@Schema()
export class ThuongHieu {

  @Prop({ required: true, unique: true })
  tenThuongHieu: string;

  @Prop({ required: true, unique: true })
  status: string;

  @Prop({ required: true, unique: true })
  anh: string;
}

export const ThuongHieuSchema = SchemaFactory.createForClass(ThuongHieu);