import { BadRequestException, Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { GenerateReportContract } from '../contracts/generate-report.contract';

@Injectable()
export class ReportService {
  constructor(
    private readonly rmqService: RMQService,
  ) {
  }

  async generate({ driver, customer, ticket, transport }: GenerateReportContract.Request) {
    try {
      this.rmqService.send<GenerateReportContract.Request, GenerateReportContract.Response>
      ('report.generate.event', { ticket, driver, customer, transport });
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      }
    }
  }
}
