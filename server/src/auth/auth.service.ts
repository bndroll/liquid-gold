import { BadRequestException, Body, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { User, UserRole } from '../user/models/user.model';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthErrorMessages } from './auth.constants';

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
      await this.register({ username: 'bogdan', fio: 'Do Si Yo', password: '1234', role: UserRole.Customer });
      await this.register({ username: 'kolya', fio: 'Lori Yang', password: '1234', role: UserRole.Driver });
      await this.register({ username: 'dima', fio: 'Dima Doska', password: '1234', role: UserRole.Driver });
      await this.register({ username: 'oleg', fio: 'Oleg Krytoi', password: '1234', role: UserRole.Dispatcher });
    }
  }

  async register(@Body() { fio, username, password, role = UserRole.Customer }: AuthRegisterDto): Promise<User> {
    const oldUser = await this.findByUsername(username);
    if (oldUser) {
      throw new BadRequestException(AuthErrorMessages.AlreadyExist);
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const user = new this.userModel({ username, fio, passwordHash, role });
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
