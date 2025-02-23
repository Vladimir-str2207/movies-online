import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './report.schema';
import { User, UserSchema } from '../user/user.schema';
import { Playlist, PlaylistSchema } from '../playlist/playlist.schema';
import { Movie, MovieSchema } from '../movie/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: User.name, schema: UserSchema },
      { name: Playlist.name, schema: PlaylistSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
