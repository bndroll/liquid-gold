import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transport, TransportCategory, TransportType } from './models/transport.model';
import { CreateTransportDto } from './dto/craete-transport.dto';

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
        title: 'Чайка Сервис 2784SG',
        description: 'Автовышка (28 м)',
        number: 'А095АА/999',
        category: TransportCategory.A,
        type: TransportType.Platforms,
      });
      await this.create({
        title: 'LIEBHERR LTM 1100-4.1',
        description: 'Кран 100 т.',
        number: 'А306АА/999',
        category: TransportCategory.C,
        type: TransportType.Cranes,
      });
      await this.create({
        title: 'DIECI ICARUS 40.17',
        description: 'Погрузчик Телескопический 7,5т/5,4м',
        number: 'А589АА/999',
        category: TransportCategory.D,
        type: TransportType.Loader,
      });
    }
  }

  async create({ title, description, number, category, type }: CreateTransportDto): Promise<Transport> {
    const oldTransport = await this.transportModel.findOne({ number }).exec();
    if (oldTransport) {
      throw new BadRequestException();
    }

    const transport = await new this.transportModel({
      title, description, number, category, type,
    });
    return await transport.save();
  }

  async findAll(): Promise<Transport[]> {
    const transports = await this.transportModel.aggregate([
      {
        $lookup: {
          from: 'ticket',
          localField: '_id',
          foreignField: 'transport',
          as: 'tickets',
        },
      },
    ]).exec();

    console.log(transports);

    return transports;
  }

  async findById(id: string): Promise<Transport> {
    return await this.transportModel.findById(id).exec();
  }
}
