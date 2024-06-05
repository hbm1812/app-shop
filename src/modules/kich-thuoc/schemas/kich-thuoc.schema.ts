import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KichThuocDocument = KichThuoc & Document;
@Schema()
export class KichThuoc {

  @Prop({ required: true })
  kichThuoc: string;

}

export const KichThuocSchema = SchemaFactory.createForClass(KichThuoc);