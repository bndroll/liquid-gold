import { Body, Controller } from '@nestjs/common';
import { ReportService } from './report.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { GenerateReportContract } from '../contracts/generate-report.contract';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {
  }

  @RMQValidate()
  @RMQRoute('report.generate.event')
  async generateReport(@Body() dto: GenerateReportContract.Request): Promise<GenerateReportContract.Response> {
    await this.reportService.generateReport(dto);
    return { success: true };
  }
}
