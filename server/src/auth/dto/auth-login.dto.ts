import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({ type: String })
  @IsString()
  username: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;
}