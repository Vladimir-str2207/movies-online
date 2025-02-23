import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema, MovieDocument } from './movie.schema';
import { validMovieRecord, id } from '../fixtures';
import mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';

describe('MovieService', () => {
  let service: MovieService;
  let movieId: string;
  let session: mongoose.mongo.ClientSession;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
      ],
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  afterEach(async () => {
    await service.remove(movieId, session);
  });

  it('create movie', async () => {
    const createdMovie = (await service.create(
      validMovieRecord,
    )) as MovieDocument;
    movieId = createdMovie._id.toString();
    expect(createdMovie).toEqual(createdMovie);
  });

  it('get movies', async () => {
    const movies = await service.findAll();
    console.log(movies);

    expect(movies).toEqual(movies);
  });

  it('get movie', async () => {
    const movie = await service.findOne(id);
    expect(movie).toEqual(movie);
  });

  it('update movie', async () => {
    const updatedMovie = await service.update(id, validMovieRecord);
    expect(updatedMovie).toEqual(updatedMovie);
  });
});
