import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UserDocument } from 'src/user/user.schema';
import * as NodeCache from 'node-cache';
import { UpdateRatingDto } from './dto/urdate-rating.dto';
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 620 });

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    myCache.del('movies');
    return createdMovie.save();
  }

  async findAll(user?: UserDocument): Promise<Movie[] | string[]> {
    let movies;
    if (myCache.has('movies')) {
      movies = myCache.get('movies') as Movie[];
    } else {
      movies = await this.movieModel.find().exec();
      myCache.set('movies', movies);
    }
    if (user) {
      return movies;
    }
    return movies.map((movie) => {
      return movie.title;
    });
  }

  async findOne(id: string, user?: UserDocument): Promise<Movie | null> {
    if (user) {
      const movie = this.movieModel
        .findById(id)
        .populate('reviews', 'estimation');
      return movie;
    }
    return this.movieModel.findById(id).select('title');
  }

  async update(
    id: string,
    { title, year, duration, genre, director, poster_path, description }: UpdateMovieDto,
  ): Promise<Movie | null> {
    myCache.del('movies');
    return await this.movieModel.findByIdAndUpdate(id, { title, year, duration, genre, director, poster_path, description }, {
      new: true,
    });
  }

  async addRating(id: string, { voteCount }: UpdateRatingDto) {
    const movie = await this.movieModel.findById(id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    await this.movieModel.updateOne(
      { _id: movie },
      { $push: { voteCount: voteCount } },
      {
        new: true,
      },
    );
    await this.updateRating(movie);

    return movie.save();
  }

  async updateRating(movie: Movie) {
    const totalVotes = movie?.voteCount.length;
    const sumVotes = movie?.voteCount.reduce(
      (acc: number, vote: number) => acc + vote,
      0,
    );
    const averageRating = totalVotes > 0 ? sumVotes / totalVotes : 0;

    return movie.rating = Math.round(averageRating * 10) / 10;
  }

  async remove(
    id: string,
    session: mongoose.mongo.ClientSession,
  ): Promise<Movie | null> {
    myCache.del('movies');
    const deletedMovie = await this.movieModel.findByIdAndDelete(id, {
      session,
    });
    return deletedMovie;
  }
}
