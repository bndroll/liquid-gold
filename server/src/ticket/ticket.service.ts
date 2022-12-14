import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket, TicketState } from './models/ticket.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UserService } from '../user/user.service';
import { TransportService } from '../transport/transport.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Transport } from '../transport/models/transport.model';
import { User } from '../user/models/user.model';
import { ReportService } from '../report/report.service';

@Injectable()
export class TicketService implements OnModuleInit {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => TransportService))
    private readonly transportService: TransportService,
    private readonly reportService: ReportService,
  ) {
  }

  async onModuleInit(): Promise<any> {
    // const tickets = await this.ticketModel.find({}).exec();
    // if (tickets.length === 0) {
    //   await this.create('6349a2f061eb9439d0e91508', {
    //     title: 'Заказ 1',
    //     description: 'Срочно нужен камаз',
    //     transport: '6349b5471fa2beefd0771a80',
    //     destination: { lat: 101, lon: 67 },
    //     priority: 1,
    //   });
    //   await this.create('6349a2f061eb9439d0e91508', {
    //     title: 'Заказ 2',
    //     description: 'Срочно нужен камаз и камаз',
    //     transport: '6349b5471fa2beefd0771a83',
    //     destination: { lat: 11, lon: 30 },
    //     priority: 3,
    //   });
    //   await this.create('6349a2f061eb9439d0e91508', {
    //     title: 'Заказ 3',
    //     description: 'Срочно нужено 3 камаза',
    //     transport: '6349b5471fa2beefd0771a86',
    //     destination: { lat: 72, lon: 4 },
    //     priority: 5,
    //   });
    // }
  }

  async create(userId: string, {
    title,
    description,
    transport,
    destination,
    priority,
    dateStart,
    dateEnd,
  }: CreateTicketDto): Promise<Ticket> {
    const oldTicket = await this.ticketModel.findOne({ title, description }).exec();
    if (oldTicket) {
      throw new NotFoundException('Такой заказ уже существует');
    }

    const orderedTransport = await this.transportService.findById(transport);
    if (!Types.ObjectId.isValid(transport) || !orderedTransport) {
      throw new NotFoundException('Такого транспорта не существует');
    }

    const isTransportAvailable =
      await this.transportService.checkForFreeInInterval(transport, priority, dateStart, dateEnd);
    if (isTransportAvailable) {
      const customer = await this.userService.findById(userId);

      const ticket = await new this.ticketModel({
        title,
        description,
        priority,
        destination,
        transport: orderedTransport._id,
        customer: customer._id,
        state: TicketState.Open,
        dateStart,
        dateEnd,
        createdDate: Date.now(),
      });
      const dbTicket = await ticket.save();

      const freeDrivers = await this.userService.findFreeDrivers();
      const resTicket = await this.filterDriversAndSetToTicket(dbTicket, orderedTransport, freeDrivers);

      if (resTicket.driver) {
        const driver = await this.userService.findById(resTicket.driver.toString());
        this.reportService.generate({
          ticket: resTicket,
          driver: driver,
          transport: orderedTransport,
          customer: customer,
        });
      }

      return resTicket;
    } else {
      throw new BadRequestException('Нет доступного транспорта');
    }
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel.find({}).exec();
  }

  async findMyTickets(userId: string): Promise<Ticket[]> {
    return await this.ticketModel.find({ customer: userId }).exec();
  }

  async findMyTicket(userId: string) {
    return await this.ticketModel
      .find({ driver: userId })
      .where('state')
      .in([TicketState.Open, TicketState.Working])
      .exec();
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();

    if (!ticket) {
      throw new NotFoundException('Нет такого заказа');
    }

    return ticket;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async setDriversToEmptyTickets() {
    const emptyTickets = await this.ticketModel
      .find({ driver: null, state: TicketState.Open || TicketState.Working })
      .exec();
    const freeDrivers = await this.userService.findFreeDrivers();

    for (const emptyTicket of emptyTickets) {
      const transport = await this.transportService.findById(emptyTicket.transport.toString());
      await this.filterDriversAndSetToTicket(emptyTicket, transport, freeDrivers);
    }
  }

  private async filterDriversAndSetToTicket(
    ticket: Ticket, transport: Transport, drivers: User[],
  ): Promise<Ticket> {
    const filteredDrivers = drivers?.filter(driver => driver.categories.includes(transport.category));
    const ratingFilteredDriver = filteredDrivers?.sort((a, b) => a.rating - b.rating)[0];

    if (ratingFilteredDriver) {
      ticket.driver = ratingFilteredDriver;
      ticket.state = TicketState.Working;
    } else {
      ticket.driver = null;
    }

    return await ticket.save();
  }

  async updateTicketDriver(id: string, driverId: string) {
    const ticket = await this.findById(id);
    const driver = await this.userService.findById(driverId);
    const freeDrivers = await this.userService.findFreeDrivers();

    if (!freeDrivers.includes(driver)) {
      throw new BadRequestException('Водитель уже занят');
    }

    ticket.driver = driver._id;
    ticket.state = TicketState.Working;

    return await ticket.save();
  }

  async closeTicket(id: string) {
    const ticket = await this.findById(id);
    ticket.state = TicketState.Close;
    return await ticket.save();
  }

  async rejectTicket(id: string) {
    const ticket = await this.findById(id);
    ticket.state = TicketState.Rejected;
    ticket.driver = null;
    ticket.transport = null;
    return await ticket.save();
  }
}
