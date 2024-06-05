import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MauSacDocument = MauSac & Document;
@Schema()
export class MauSac {

  @Prop({ required: true })
  mauSac: string;
}

export const MauSacSchema = SchemaFactory.createForClass(MauSac);