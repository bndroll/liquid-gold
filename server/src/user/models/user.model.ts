import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TransportCategory } from '../../transport/models/transport.model';

export enum UserRole {
  Customer = 'Customer',
  Driver = 'Driver',
  Dispatcher = 'Dispatcher'
}

export enum RatingLevel {
  Journeyman,
  ExperiencedMiner,
  GoldenArrow,
  Nugget,
  SandpitGeneral
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  fio: string;

  @Prop({ required: true, enum: UserRole, type: String })
  role: UserRole;

  @Prop({ required: true, enum: RatingLevel, type: String })
  rating: RatingLevel;

  @Prop({ required: true })
  categories: TransportCategory[];

  @Prop()
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);