import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRMQConfig } from './configs/rmq.config';
import { RMQModule } from 'nestjs-rmq';
import { RaportModule } from './raport/raport.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RMQModule.forRootAsync(getRMQConfig()),
    RaportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
