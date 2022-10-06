import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Role, RoleGuard } from './guards/role.guard';
import { UserRole } from './models/user.model';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from './decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  async findById(@Param('id', IdValidationPipe) id: string) {
    return await this.userService.findById(id);
  }

  @Get('find/me')
  @UseGuards(JwtAuthGuard)
  async findMe(@UserId() id: string) {
    return await this.userService.findById(id);
  }
}
