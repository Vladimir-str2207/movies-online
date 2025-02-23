import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailConfigService } from './mail.constants';

interface ISendMessage {
  email: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private client;

  constructor(private mailConfigService: MailConfigService) {
    const mailSettings = this.mailConfigService.SETTINGS;
    this.client = nodemailer.createTransport(mailSettings);
  }

  async sendMessage({ email, subject, html }: ISendMessage) {
    await this.client.sendMail({
      from: this.mailConfigService.FROM_EMAIL,
      to: email,
      subject,
      html,
    });
  }
}
