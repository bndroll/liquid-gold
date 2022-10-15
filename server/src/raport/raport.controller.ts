import { BadRequestException, Controller, Get } from '@nestjs/common';
import { RaportService } from './raport.service';
import { RMQService } from 'nestjs-rmq';
import { TestContract } from '../../../raport-service/src/contracts/test.contract';

@Controller('raport')
export class RaportController {
  constructor(
    private readonly raportService: RaportService,
    private readonly rmqService: RMQService,
  ) {
  }

  @Get()
  async test() {
    try {
      return await this.rmqService.send<TestContract.Request, TestContract.Response>(TestContract.topic, { text: 'maxim' });
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      }
    }
  }
}
