import { forwardRef, Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { Ticket, TicketSchema } from './models/ticket.model';
import { UserModule } from '../user/user.module';
import { TransportModule } from '../transport/transport.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
    ]),
    JwtModule.registerAsync(getJwtConfig()),
    ScheduleModule,
    ConfigModule,
    UserModule,
    forwardRef(() => TransportModule),
    ReportModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {
}
