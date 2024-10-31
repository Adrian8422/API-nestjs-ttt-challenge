import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: false })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'Auth', required: true })
  authId: Types.ObjectId;

//   @Prop({ required: true })
//   password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
