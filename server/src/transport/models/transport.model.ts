import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TransportCategory {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum TransportType {
  Platforms = 'Platforms',
  Cranes = 'Cranes',
  Loader = 'Loader'
}

export interface TransportGeoPoint {
  lat: number;
  lon: number;
}

@Schema()
export class Transport extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  category: TransportCategory;

  @Prop(raw({
    lat: { type: Number },
    lon: { type: Number },
  }))
  destination: TransportGeoPoint;

  @Prop({ required: true, enum: TransportType, type: String })
  type: TransportType;
}

export const TransportSchema = SchemaFactory.createForClass(Transport);