import { Injectable } from '@nestjs/common';
import { GenerateReportContract } from '../contracts/generate-report.contract';
import * as fs from 'fs';
import * as path from 'path';

const pdf = require('pdf-creator-node');

@Injectable()
export class ReportService {
  async generateReport({ customer, driver, transport, ticket }: GenerateReportContract.Request) {
    const html = fs.readFileSync(path.join(__dirname, '../../template.html'), 'utf-8');
    const filename = `${Date.now()}_${driver.username}_${transport.title}_doc.pdf`;

    const data = {
      date: new Date().toString(),
      fio: driver.fio,
      auto: transport.title,
      auto_number: transport.number,
      customer_fio: customer.fio,
      ticket_title: ticket.title,
      ticket_description: ticket.description,
      ticket_coords: `${ticket.destination.lat} ${ticket.destination.lon}`,
    };

    const document = {
      html: html,
      data: data,
      path: './docs/' + filename,
    };

    pdf.create(document, {
      formate: 'A4',
      orientation: 'portrait',
      border: '20mm',
      header: {
        height: '15mm',
        contents: '<h4 style=" color: #FAB529;font-size: "20px";font-weight:800;text-align:center;">Золотой Дождь</h4>',
      },
      footer: {
        height: '20mm',
      },
    });
  }
}
