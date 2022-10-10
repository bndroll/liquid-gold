import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({description: 'Register new user'})
  @ApiResponse({ status: 201, description: 'User has been successfully created'})
  @ApiResponse({ status: 400, description: 'User already exist'})
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthRegisterDto) {
    return await this.authService.register(dto);
  }

  @ApiOperation({description: 'Login registered user'})
  @ApiResponse({ status: 200, description: 'User successfully logged in'})
  @ApiResponse({ status: 404, description: 'Wrong data'})
  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() { phone, password }: AuthLoginDto) {
    const { id } = await this.authService.validateUser(phone, password);
    return await this.authService.login(id);
  }
}
