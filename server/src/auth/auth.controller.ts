import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthRegisterDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() { phone, password }: AuthLoginDto) {
    const { id } = await this.authService.validateUser(phone, password);
    return await this.authService.login(id);
  }
}
