import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRole {
  Customer = 'Customer',
  Driver = 'Driver',
  Dispatcher = 'Dispatcher',
  Admin = 'Admin'
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: UserRole, type: String })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);