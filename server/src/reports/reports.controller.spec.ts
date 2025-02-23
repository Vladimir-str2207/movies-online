import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { Report, ReportSchema } from './report.schema';
import { Movie, MovieSchema } from 'src/movie/movie.schema';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';
import { ConfigModule } from '@nestjs/config';

describe('ReportsController', () => {
  let controller: ReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Report.name, schema: ReportSchema },
          { name: Playlist.name, schema: PlaylistSchema },
          { name: Movie.name, schema: MovieSchema },
        ]),
      ],
      controllers: [ReportsController],
      providers: [ReportsService],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
