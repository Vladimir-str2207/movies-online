import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailConfigService {
  constructor(private configService: ConfigService) {}
  get MAIL_PORT() {
    return this.configService.get<number>('MAIL_PORT');
  }
  get FROM_EMAIL() {
    return this.configService.get<string>('FROM_EMAIL');
  }

  get MAIL_SERVER(){
    return this.configService.get<string>('MAIL_SERVER');
  }

  get MAIL_TOKEN(){
    return this.configService.get<string>('MAIL_TOKEN');
  }

  get SETTINGS() {
    return {
      host: this.MAIL_SERVER,
      port: this.MAIL_PORT,
      secure: true,
      logger: true,
      auth: {
        user: this.FROM_EMAIL,
        pass: this.MAIL_TOKEN,
      },
    };
  }
  
}