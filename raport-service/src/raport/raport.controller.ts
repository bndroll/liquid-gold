import { Body, Controller } from '@nestjs/common';
import { RaportService } from './raport.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TestContract } from '../contracts/test.contract';

@Controller()
export class RaportController {
  constructor(private readonly raportService: RaportService) {
  }

  @RMQValidate()
  @RMQRoute(TestContract.topic)
  async test(@Body() dto: TestContract.Request): Promise<TestContract.Response> {
    console.log(dto.text);
    return { greeting: `${dto.text} hello` };
  }
}
