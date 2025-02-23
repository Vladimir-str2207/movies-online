import { Test, TestingModule } from '@nestjs/testing';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';
import { Director, DirectorSchema } from './director.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { User, UserSchema } from '../user/user.schema';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { Public } from 'src/decorators/public.decorator';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

describe('DirectorController', () => {
  let controller: DirectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule,
        AuthModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
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
      ],
    }).compile();

    controller = module.get<DirectorController>(DirectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
