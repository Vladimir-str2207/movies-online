import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { Movie, MovieSchema } from 'src/movie/movie.schema';
import { Director, DirectorSchema } from 'src/director/director.schema';
import { MovieService } from 'src/movie/movie.service';
import { DirectorService } from 'src/director/director.service';
import { MailService } from 'src/mail/mail.service';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';
import { MailConfigService } from 'src/mail/mail.constants';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: Director.name, schema: DirectorSchema },
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
    PassportModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    ConfigService,
    UserService,
    MovieService,
    DirectorService,
    MailService,
    MailConfigService,
  ],
})
export class AuthModule {}
