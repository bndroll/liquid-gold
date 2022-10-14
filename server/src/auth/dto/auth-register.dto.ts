import { UserRole } from '../../user/models/user.model';
import { IsEnum, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransportCategory } from '../../transport/models/transport.model';

export class AuthRegisterDto {
  _id: string;

  @ApiProperty({ description: 'Should contains at least 3 characters', type: String })
  @IsString()
  @MinLength(3, { message: 'Username should contains at least 3 characters' })
  username: string;

  @ApiProperty({ description: 'Should contains at least 3 characters', type: String })
  @IsString()
  @MinLength(3, { message: 'Password should contains at least 3 characters' })
  password: string;

  @ApiProperty({ description: 'FIO of user', type: String })
  @IsString()
  fio: string;

  @ApiProperty({
    enum: ['Customer', 'Driver', 'Dispatcher'],
    default: 'Customer',
    type: UserRole,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsNumber()
  rating: number;

  categories: TransportCategory[];
}