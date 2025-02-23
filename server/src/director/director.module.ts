import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './director.schema';
import { AuthService } from '../auth/auth.service';
import { User, UserSchema } from '../user/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { MailConfigService } from 'src/mail/mail.constants';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Director.name, schema: DirectorSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [DirectorController],
  providers: [
    DirectorService,
    AuthService,
    JwtService,
    ConfigService,
    UserService,
    MailService,
    MailConfigService,
  ],
})
export class DirectorModule {}
