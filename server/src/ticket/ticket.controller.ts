import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UserId } from '../user/decorators/user.decorator';
import { Role } from '../user/decorators/role.decorator';
import { UserRole } from '../user/models/user.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../user/guards/role.guard';
import { ApiOperation } from '@nestjs/swagger';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('ticket')
export class TicketController {
  constructor(private readonly tickerService: TicketService) {
  }

  @ApiOperation({ description: 'Create new ticket' })
  @Post()
  @Role(UserRole.Customer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateTicketDto, @UserId() userId: string) {
    return await this.tickerService.create(userId, dto);
  }

  @Get()
  @Role(UserRole.Dispatcher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll() {
    return await this.tickerService.findAll();
  }

  @Get('my')
  @Role(UserRole.Customer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findMyTickets(@UserId() userId: string) {
    return await this.tickerService.findMyTickets(userId);
  }

  @Patch(':id/close')
  @Role(UserRole.Dispatcher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async closeTicket(@Param('id', IdValidationPipe) id: string) {
    return await this.tickerService.closeTicket(id);
  }
}
