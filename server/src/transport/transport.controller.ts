import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TransportService } from './transport.service';
import { Role } from '../user/decorators/role.decorator';
import { UserRole } from '../user/models/user.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../user/guards/role.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.transportService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', IdValidationPipe) id: string) {
    return await this.transportService.findById(id);
  }


  @Get('/find/with-ticket')
  @Role(UserRole.Dispatcher)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAllWithTickets() {
    return await this.transportService.findAllWithTickets();
  }
}
