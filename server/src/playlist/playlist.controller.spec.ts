import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Playlist, PlaylistSchema } from './playlist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { ConfigModule } from '@nestjs/config';

describe('PlaylistController', () => {
  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([
          { name: Playlist.name, schema: PlaylistSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      controllers: [PlaylistController],
      providers: [PlaylistService],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
