import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { Review, ReviewSchema } from './review.schema';
import { Movie, MovieSchema } from 'src/movie/movie.schema';
import { ConfigModule } from '@nestjs/config';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Review.name, schema: ReviewSchema },
          { name: Movie.name, schema: MovieSchema },
        ]),
      ],
      providers: [ReviewService],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
