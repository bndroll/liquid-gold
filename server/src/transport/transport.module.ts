import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { Transport, TransportSchema } from './models/transport.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transport.name, schema: TransportSchema },
    ]),
    JwtModule.registerAsync(getJwtConfig()),
    ConfigModule,
    UserModule,
  ],
  controllers: [TransportController],
  providers: [TransportService],
  exports: [TransportService]
})
export class TransportModule {
}
