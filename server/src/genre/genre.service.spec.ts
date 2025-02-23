import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema, GenreDocument } from './genre.schema';
import { validGenreRecord } from '../fixtures';
import { ConfigModule } from '@nestjs/config';

describe('GenreService', () => {
  let service: GenreService;
  let genreId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
      ],
      providers: [GenreService],
    }).compile();

    service = module.get<GenreService>(GenreService);
  });

  afterEach(async () => {
    await service.remove(genreId);
  });

  it('create genre', async () => {
    const createdGenre = (await service.create(
      validGenreRecord,
    )) as GenreDocument;
    genreId = createdGenre._id.toString();
    expect(createdGenre).toEqual(createdGenre);
  });

  it('get genres', async () => {
    const genres = await service.findAll();
    expect(genres).toEqual(genres);
  });
});
