import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User, UserDocument, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { validUserRecord, validUserUpdateRecord, id } from '../fixtures';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';

describe('UserService', () => {
  let service: UserService;
  let authService: AuthService;
  let userId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        UserService,
        AuthService,
        JwtService,
        ConfigService,
        MailService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await service.remove(userId);
  });

  it('create user', async () => {
    const createdUser = (await service.create(validUserRecord)) as UserDocument;
    userId = createdUser._id.toString();
    expect(createdUser).toEqual(createdUser);
  });

  it('get users', async () => {
    const users = await service.findAll();
    expect(users).toEqual(users);
  });

  it('get user', async () => {
    const user = await service.findOne(id);
    expect(user).toEqual(user);
  });

  it('update user', async () => {
    const updatedUser = await service.update(id, validUserUpdateRecord);
    expect(updatedUser).toEqual(updatedUser);
  });
});
