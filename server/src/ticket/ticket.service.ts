import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket, TicketState } from './models/ticket.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UserService } from '../user/user.service';
import { TransportService } from '../transport/transport.service';

@Injectable()
export class TicketService implements OnModuleInit {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    private readonly userService: UserService,
    private readonly transportService: TransportService,
  ) {
  }

  async onModuleInit(): Promise<any> {
    const tickets = await this.ticketModel.find({}).exec();
    if (tickets.length === 0) {
      await this.create('6349a2f061eb9439d0e91508', {
        // _id: '6349ca42195f40aec14a8b32',
        title: 'Заказ 1',
        description: 'Срочно нужен камаз',
        transport: '6349b5471fa2beefd0771a80',
        destination: { lat: 101, lon: 67 },
        priority: 1,
      });
      await this.create('6349a2f061eb9439d0e91508', {
        // _id: '6349ca42195f40aec14a8b37',
        title: 'Заказ 2',
        description: 'Срочно нужен камаз и камаз',
        transport: '6349b5471fa2beefd0771a83',
        destination: { lat: 11, lon: 30 },
        priority: 3,
      });
      await this.create('6349a2f061eb9439d0e91508', {
        // _id: '6349ca42195f40aec14a8b3c',
        title: 'Заказ 3',
        description: 'Срочно нужено 3 камаза',
        transport: '6349b5471fa2beefd0771a86',
        destination: { lat: 72, lon: 4 },
        priority: 5,
      });
    }
  }

  async create(userId: string, {
    // _id,
    title,
    description,
    transport,
    destination,
    priority,
  }: CreateTicketDto): Promise<Ticket> {
    const oldTicket = await this.ticketModel.findOne({ title, description }).exec();
    if (oldTicket) {
      throw new NotFoundException('Такой заказ уже существует');
    }

    const orderedTransport = await this.transportService.findById(transport);
    if (!Types.ObjectId.isValid(transport) || !orderedTransport) {
      throw new NotFoundException('Такого транспорта не существует');
    }

    const customer = await this.userService.findById(userId);

    const ticket = await new this.ticketModel({
      // _id,
      title,
      description,
      priority,
      destination,
      transport: orderedTransport._id,
      customer: customer._id,
      state: TicketState.Open,
    });
    const dbTicket = await ticket.save();

    const freeDrivers = await this.userService.findFreeDrivers();
    const filteredDrivers = freeDrivers?.filter(driver => driver.categories.includes(orderedTransport.category));
    const ratingFilteredDriver = filteredDrivers.sort((a, b) => a.rating - b.rating)[0];

    dbTicket.driver = ratingFilteredDriver ?? null;

    return await dbTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel.find({}).exec();
  }

  async findMyTickets(userId: string): Promise<Ticket[]> {
    return await this.ticketModel.find({ customer: userId }).exec();
  }

  async findMyTicket(userId: string) {
    return await this.ticketModel.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: 'driver',
          as: 'tickets',
        },
      },
    ]).exec();
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();

    if (!ticket) {
      throw new NotFoundException('Нет такого заказа');
    }

    return ticket;
  }

  async updateTicketDriver(id: string, driverId: string) {
    const ticket = await this.findById(id);
    const driver = await this.userService.findById(driverId);

    ticket.driver = driver._id;
    ticket.state = TicketState.Working;

    return await ticket.save();
  }

  async closeTicket(id: string) {
    const ticket = await this.findById(id);
    ticket.state = TicketState.Close;
    return await ticket.save();
  }
}
