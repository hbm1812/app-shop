import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuyenDocument = Quyen & Document;
@Schema({ collection: 'quyen' })
export class Quyen {
  @Prop({ required: true, unique: true })
  role: string;
}

export const QuyenSchema = SchemaFactory.createForClass(Quyen);