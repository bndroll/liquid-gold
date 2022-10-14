import { TransportType } from '../models/transport.model';

export class CreateTransportDto {
  title: string;
  description: string;
  number: string;
  category: string;
  type: TransportType;
}