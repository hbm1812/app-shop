import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quyen', default: 'ObjectId của role user mặc định' })
    role: mongoose.Schema.Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(User);
