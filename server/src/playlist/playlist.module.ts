import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist, PlaylistSchema } from './playlist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, UserService],
})
export class PlaylistModule {}
