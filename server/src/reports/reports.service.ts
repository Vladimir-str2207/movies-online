import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReportDto } from './dto/create-report.dto';
import { Model } from 'mongoose';
import * as schedule from 'node-schedule';
import { Report, ReportDocument } from './report.schema';
import { User, UserDocument } from '../user/user.schema';
import { Movie, MovieDocument } from '../movie/movie.schema';
import { Playlist, PlaylistDocument } from '../playlist/playlist.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,

    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,

    @InjectModel(Playlist.name)
    private playlistModel: Model<PlaylistDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    const job = schedule.scheduleJob('*/2 * * * *', async () => {
      const statisticData = await this.getStatisticData();
      this.create(statisticData);
    });
  }

  async create(createReportDto: CreateReportDto) {
    const createdReport = new this.reportModel(createReportDto);
    return createdReport.save();
  }

  async getStatisticData(): Promise<CreateReportDto> {
    const statisticData = new CreateReportDto();
    statisticData.moviesCount = await this.movieModel.countDocuments();
    statisticData.playlistsCount = await this.playlistModel.countDocuments();
    statisticData.usersCount = await this.userModel.countDocuments();
    return statisticData;
  }
}
