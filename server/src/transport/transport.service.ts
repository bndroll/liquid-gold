import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transport, TransportCategory, TransportType } from './models/transport.model';
import { CreateTransportDto } from './dto/craete-transport.dto';
import { TicketState } from '../ticket/models/ticket.model';

@Injectable()
export class TransportService implements OnModuleInit {
  constructor(
    @InjectModel(Transport.name) private readonly transportModel: Model<Transport>,
  ) {
  }

  async onModuleInit(): Promise<any> {
    const transport = await this.transportModel.find({}).exec();
    if (transport.length === 0) {
      await this.create({
        _id: '6349b5471fa2beefd0771a80',
        title: 'Чайка Сервис 2784SG',
        description: 'Автовышка (28 м)',
        number: 'А095АА/999',
        category: TransportCategory.A,
        coordinates: {lat: 10, lon: 20},
        type: TransportType.Platforms,
      });
      await this.create({
        _id: '6349b5471fa2beefd0771a83',
        title: 'LIEBHERR LTM 1100-4.1',
        description: 'Кран 100 т.',
        number: 'А306АА/999',
        category: TransportCategory.C,
        coordinates: {lat: 30, lon: 40},
        type: TransportType.Cranes,
      });
      await this.create({
        _id: '6349b5471fa2beefd0771a86',
        title: 'DIECI ICARUS 40.17',
        description: 'Погрузчик Телескопический 7,5т/5,4м',
        number: 'А589АА/999',
        category: TransportCategory.D,
        coordinates: {lat: 50, lon: 60},
        type: TransportType.Loader,
      });
    }
  }

  async create({ _id, title, description, number, category, coordinates, type }: CreateTransportDto): Promise<Transport> {
    const oldTransport = await this.transportModel.findOne({ number }).exec();
    if (oldTransport) {
      throw new BadRequestException();
    }

    const transport = await new this.transportModel({
      _id, title, description, number, category, coordinates, type,
    });
    return await transport.save();
  }

  async findAll(): Promise<Transport[]> {
    const transports = await this.findAllWithTickets();
    const res = transports.map(item => {
      const { tickets, ...rest } = item;
      return rest;
    });
    return res.sort((a, b) => a.type - b.type);
  }

  async findAllWithTickets() {
    const transport = await this.transportModel.aggregate([
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: 'transport',
          as: 'tickets',
        },
      },
    ]).exec();

    return transport.map(transport => {
      const isOrdersClose = !transport.tickets?.find(ticket => ticket.state !== TicketState.Close);
      if (isOrdersClose && transport.tickets.length === 0) {
        return { ...transport, isFree: true };
      }
      return { ...transport, isFree: false };
    });
  }

  async findById(id: string): Promise<Transport> {
    return await this.transportModel.findById(id).exec();
  }
}
