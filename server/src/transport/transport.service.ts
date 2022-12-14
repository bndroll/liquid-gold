import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Transport, TransportCategory, TransportType } from './models/transport.model';
import { CreateTransportDto } from './dto/craete-transport.dto';
import { Ticket, TicketState } from '../ticket/models/ticket.model';
import { TicketService } from '../ticket/ticket.service';
import { UserErrorMessages } from '../user/user.constants';

@Injectable()
export class TransportService implements OnModuleInit {
  constructor(
    @InjectModel(Transport.name) private readonly transportModel: Model<Transport>,
    @Inject(forwardRef(() => TicketService))
    private readonly ticketService: TicketService,
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
        coordinates: { lat: 10, lon: 20 },
        type: TransportType.Platforms,
      });
      await this.create({
        _id: '6349b5471fa2beefd0771a83',
        title: 'LIEBHERR LTM 1100-4.1',
        description: 'Кран 100 т.',
        number: 'А306АА/999',
        category: TransportCategory.C,
        coordinates: { lat: 30, lon: 40 },
        type: TransportType.Cranes,
      });
      await this.create({
        _id: '6349b5471fa2beefd0771a86',
        title: 'DIECI ICARUS 40.17',
        description: 'Погрузчик Телескопический 7,5т/5,4м',
        number: 'А589АА/999',
        category: TransportCategory.D,
        coordinates: { lat: 50, lon: 60 },
        type: TransportType.Loader,
      });
    }
  }

  async create({
                 _id,
                 title,
                 description,
                 number,
                 category,
                 coordinates,
                 type,
               }: CreateTransportDto): Promise<Transport> {
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
      const { tickets, isOpen, isWorking, ...rest } = item;
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
      const isOrdersClose = transport.tickets?.find(ticket => ticket.state !== TicketState.Close);
      if (!isOrdersClose && transport.tickets.length === 0) {
        return { ...transport, isFree: true, isOpen: false, isWorking: false };
      }

      if (isOrdersClose.state === TicketState.Open) {
        return { ...transport, isFree: false, isOpen: true, isWorking: false };
      } else {
        return { ...transport, isFree: false, isOpen: false, isWorking: true };
      }
    });
  }

  async findById(id: string): Promise<Transport> {
    const transport = await this.transportModel.findById(id).exec();

    if (!transport) {
      throw new NotFoundException('Нет такого транспорта');
    }

    return transport;
  }

  async checkForFreeInInterval(
    transportId: string, priority: number, dateStart: number, dateEnd: number,
  ): Promise<boolean> {
    const transports = await this.transportModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(transportId) } },
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: 'transport',
          as: 'tickets',
        },
      },
    ]).exec();
    const transport = transports[0];

    if (transport.tickets.length === 0) {
      return true;
    }

    const newDateStart = new Date(dateStart);
    const newDateEnd = new Date(dateEnd);

    const blockedTickets: Ticket[] = [];

    for (const ticket of transport.tickets) {
      if (
        (newDateEnd >= ticket.dateStart && newDateEnd <= ticket.dateEnd) ||
        (ticket.dateEnd >= newDateStart && ticket.dateEnd <= newDateEnd)
      ) {
        blockedTickets.push(ticket);
      }
    }

    if (blockedTickets.length === 0) {
      return true;
    }

    for (const blockedTicket of blockedTickets) {
      if (priority <= blockedTicket.priority) {
        return false;
      }
    }

    for (const blockedTicket of blockedTickets) {
      await this.ticketService.rejectTicket(blockedTicket._id);
    }

    return true;
  }
}
