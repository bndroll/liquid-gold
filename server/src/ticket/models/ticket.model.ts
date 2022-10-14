import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Transport } from '../../transport/models/transport.model';
import { User } from '../../user/models/user.model';

export enum TicketState {
  Open = 'Open',
  Working = 'Working',
  Close = 'Close'
}

export interface TicketGeoPoint {
  lat: number;
  lon: number;
}

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  priority: number;

  @Prop(raw({
    lat: { type: Number },
    lon: { type: Number },
  }))
  destination: TicketGeoPoint;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Transport' })
  transport: Transport;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  driver: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;

  @Prop({ required: true, enum: TicketState, type: String })
  state: TicketState;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);