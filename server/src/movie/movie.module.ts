import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { AuthService } from '../auth/auth.service';
import { User, UserSchema } from '../user/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { PlaylistService } from 'src/playlist/playlist.service';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';
import { MailConfigService } from 'src/mail/mail.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    AuthService,
    JwtService,
    ConfigService,
    UserService,
    MailService,
    PlaylistService,
    MailConfigService,
  ],
})
export class MovieModule {}
