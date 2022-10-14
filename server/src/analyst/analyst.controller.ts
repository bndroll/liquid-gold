import { Controller } from '@nestjs/common';
import { AnalystService } from './analyst.service';

@Controller('analyst')
export class AnalystController {
  constructor(private readonly analystService: AnalystService) {}
}
