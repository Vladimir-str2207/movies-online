import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { Director, DirectorSchema, DirectorDocument } from './director.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { validDirectorRecord } from '../fixtures';
import { ConfigModule } from '@nestjs/config';

describe('DirectorService', () => {
  let service: DirectorService;
  let directorId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([
          { name: Director.name, schema: DirectorSchema },
        ]),
      ],
      providers: [DirectorService],
    }).compile();

    service = module.get<DirectorService>(DirectorService);
  });

  afterEach(async () => {
    await service.remove(directorId);
  });

  it('create director', async () => {
    const createdDirector = (await service.create(
      validDirectorRecord,
    )) as DirectorDocument;
    directorId = createdDirector._id.toString();
    expect(createdDirector).toEqual(createdDirector);
  });

  it('get directors', async () => {
    const directors = await service.findAll();
    expect(directors).toEqual(directors);
  });
});
