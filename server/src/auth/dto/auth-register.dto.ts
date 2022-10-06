import { UserRole } from '../../user/models/user.model';
import { IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  @MinLength(3, { message: 'Username should contains at least 3 characters' })
  username: string;

  @IsString()
  @MinLength(3, { message: 'Username should contains at least 3 characters' })
  password: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}