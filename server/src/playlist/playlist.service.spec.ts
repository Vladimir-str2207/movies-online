import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from './playlist.service';
import { Playlist, PlaylistSchema } from './playlist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { ConfigModule } from '@nestjs/config';

describe('PlaylistService', () => {
  let service: PlaylistService;

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
      providers: [PlaylistService],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
