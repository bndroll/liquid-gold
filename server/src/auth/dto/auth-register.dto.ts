import { UserRole } from '../../user/models/user.model';
import { IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
  @ApiProperty({ description: 'Should contains at least 3 characters', type: String })
  @IsString()
  @MinLength(3, { message: 'Username should contains at least 3 characters' })
  username: string;

  @ApiProperty({ description: 'Should contains at least 3 characters', type: String })
  @IsString()
  @MinLength(3, { message: 'Password should contains at least 3 characters' })
  password: string;

  @ApiProperty({ description: 'Must be a real phone number', type: String })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    enum: ['Customer', 'Driver', 'Dispatcher', 'Admin'],
    default: 'Customer',
    type: UserRole,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}