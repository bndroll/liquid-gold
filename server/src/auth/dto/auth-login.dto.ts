import { IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({type: String})
  @IsString()
  username: string;

  @ApiProperty({type: String})
  @IsString()
  password: string;

  @ApiProperty({ description: 'Must be a real phone number', type: String })
  @IsString()
  @IsPhoneNumber()
  phone: string;
}