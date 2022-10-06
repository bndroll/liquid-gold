import { IsPhoneNumber, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;
}