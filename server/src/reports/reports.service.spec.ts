import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './report.schema';
import { Movie, MovieSchema } from 'src/movie/movie.schema';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { ConfigModule } from '@nestjs/config';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([
          { name: Report.name, schema: ReportSchema },
          { name: Movie.name, schema: MovieSchema },
          { name: Playlist.name, schema: PlaylistSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [ReportsService],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
