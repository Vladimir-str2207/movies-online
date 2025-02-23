import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailConfigService } from './mail.constants';

@Module({
  controllers: [MailController],
  providers: [MailService, MailConfigService],
})
export class MailModule {}
