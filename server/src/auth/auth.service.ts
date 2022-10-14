import { BadRequestException, Body, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { User, UserRole } from '../user/models/user.model';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthErrorMessages } from './auth.constants';
import { TransportCategory } from '../transport/models/transport.model';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {
  }

  async onModuleInit(): Promise<any> {
    const users = await this.userModel.find({}).exec();
    if (users.length === 0) {
      await this.register({
        _id: '6349a2f061eb9439d0e91508',
        username: 'bogdan',
        fio: 'Do Si Yo',
        password: '1234',
        role: UserRole.Customer,
        rating: 4,
        categories: [TransportCategory.A, TransportCategory.C],
      });
      await this.register({
        _id: '6349a2f061eb9439d0e9150b',
        username: 'kolya',
        fio: 'Lori Yang',
        password: '1234',
        role: UserRole.Driver,
        rating: 4,
        categories: [TransportCategory.B, TransportCategory.D],
      });
      await this.register({
        _id: '6349a2f061eb9439d0e9150e',
        username: 'dima',
        fio: 'Dima Doska',
        password: '1234',
        role: UserRole.Driver,
        rating: 4,
        categories: [TransportCategory.D],
      });
      await this.register({
        _id: '6349a2f061eb9439d0e91511',
        username: 'oleg',
        fio: 'Oleg Krytoi',
        password: '1234',
        role: UserRole.Dispatcher,
        rating: 4,
        categories: [TransportCategory.B],
      });
    }
  }

  async register(@Body() {
    _id, fio, username, password, role = UserRole.Customer, rating = 4, categories,
  }: AuthRegisterDto): Promise<User> {
    const oldUser = await this.findByUsername(username);
    if (oldUser) {
      throw new BadRequestException(AuthErrorMessages.AlreadyExist);
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const user = new this.userModel({ _id: _id, username, fio, passwordHash, role, rating, categories });
    return await user.save();
  }

  async login(id: string): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async validateUser(username: string, password: string): Promise<Pick<User, 'id'>> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException(AuthErrorMessages.WrongData);
    }

    const isPasswordCorrect = await compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new NotFoundException(AuthErrorMessages.WrongData);
    }

    return { id: user.id };
  }
}
