import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThuongHieuDocument = ThuongHieu & Document;
@Schema()
export class ThuongHieu {

  @Prop({ required: true })
  tenThuongHieu: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true})
  anh: string;
}

export const ThuongHieuSchema = SchemaFactory.createForClass(ThuongHieu);