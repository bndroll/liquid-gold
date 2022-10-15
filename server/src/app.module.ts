import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';
import { TransportModule } from './transport/transport.module';
import { TicketModule } from './ticket/ticket.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(getMongoConfig()),
    ScheduleModule.forRoot(),
    RMQModule.forRootAsync(getRMQConfig()),
    AuthModule,
    UserModule,
    TransportModule,
    TicketModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
