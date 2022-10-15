import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './models/user.model';
import { Model } from 'mongoose';
import { UserErrorMessages } from './user.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({}).exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('Нет такого пользователя');
    }

    return user;
  }

  async findFreeDrivers() {
    return await this.userModel.aggregate([
      { $match: { role: UserRole.Driver } },
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: 'driver',
          as: 'tickets',
        },
      },
      { $addFields: { ticketsSize: { $size: '$tickets' } } },
      { $match: { ticketsSize: 0 } },
      { $unset: ['ticketsSize', 'tickets'] },
    ]).exec();
  }

  async findAllDrivers() {
    return await this.userModel.aggregate([
      { $match: { role: UserRole.Driver } },
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: 'driver',
          as: 'tickets',
        },
      },
      {
        $addFields: {
          isFree: { $cond: { if: { $size: '$tickets' }, then: true, else: false } },
        },
      },
      { $unset: ['tickets'] },
    ]).exec();
  }
}
