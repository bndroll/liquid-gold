import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { UserId } from './decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from './guards/role.guard';
import { Role } from './decorators/role.decorator';
import { UserRole } from './models/user.model';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiOperation({ description: 'Find all users' })
  @ApiResponse({ status: 200, description: 'Successfully getting a list of users' })
  @ApiResponse({ status: 403, description: 'Forbidden, because role is not a Dispatcher' })
  @ApiBearerAuth()
  @Get()
  @Role(UserRole.Dispatcher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ description: 'Find user by id' })
  @ApiResponse({ status: 200, description: 'Successfully getting a user' })
  @ApiResponse({ status: 403, description: 'Forbidden, because role is not a Admin' })
  @ApiBearerAuth()
  @Get(':id')
  @Role(UserRole.Dispatcher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findById(@Param('id', IdValidationPipe) id: string) {
    return await this.userService.findById(id);
  }

  @ApiOperation({ description: 'Find current user by bearer token' })
  @ApiResponse({ status: 200, description: 'Successfully getting a current user info' })
  @ApiResponse({ status: 403, description: 'Forbidden, because you are not logged in' })
  @ApiBearerAuth()
  @Get('find/me')
  @UseGuards(JwtAuthGuard)
  async findMe(@UserId() id: string) {
    return await this.userService.findById(id);
  }

  @Get('find/free-drivers')
  @Role(UserRole.Dispatcher, UserRole.Customer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findFreeDrivers() {
    return await this.userService.findFreeDrivers();
  }

  @Get('find/all-drivers')
  @Role(UserRole.Dispatcher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAllDrivers() {
    return await this.userService.findAllDrivers();
  }
}
