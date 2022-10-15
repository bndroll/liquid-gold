import { Ticket, Transport, User } from './types';

export namespace GenerateReportContract {
  export const topic = 'report.generate.event';

  export class Request {
    ticket: Ticket;
    driver: User;
    transport: Transport;
    customer: User;
  }

  export class Response {
    success: boolean;
  }
}