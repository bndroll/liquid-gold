import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ReportModule } from './report/report.module';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RMQModule.forRootAsync(getRMQConfig()),
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
