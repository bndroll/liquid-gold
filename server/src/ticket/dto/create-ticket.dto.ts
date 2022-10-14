import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { TicketGeoPoint } from '../models/ticket.model';

export class CreateTicketDto {
  _id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  priority: number;

  @IsNotEmpty()
  destination: TicketGeoPoint;

  @IsString()
  transport: string;
}