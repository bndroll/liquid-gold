import { TransportType } from '../models/transport.model';

export class CreateTransportDto {
  _id: string;
  title: string;
  description: string;
  number: string;
  category: string;
  type: TransportType;
}