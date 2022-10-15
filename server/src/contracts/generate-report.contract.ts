import { Ticket } from '../ticket/models/ticket.model';
import { User } from '../user/models/user.model';
import { Transport } from '../transport/models/transport.model';

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