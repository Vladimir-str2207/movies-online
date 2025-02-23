import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { AuthService } from '../auth/auth.service';
import { User, UserSchema } from '../user/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { PlaylistService } from 'src/playlist/playlist.service';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';

describe('MovieController', () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_CONNECTION!),
        MongooseModule.forFeature([
          { name: Movie.name, schema: MovieSchema },
          { name: User.name, schema: UserSchema },
          { name: Playlist.name, schema: PlaylistSchema },
        ]),
      ],
      controllers: [MovieController],
      providers: [
        MovieService,
        PlaylistService,
        AuthService,
        JwtService,
        UserService,
        ConfigService,
        MailService,
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
// import { MovieController } from "./movie.controller";
// import { MovieService } from './movie.service';
// import { Test } from '@nestjs/testing';
// describe('CatsController', () => {
//   let movieController: MovieController;
//   let movieService: MovieService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//         controllers: [MovieController],
//         providers: [MovieService],
//       }).compile();

//       movieService = moduleRef.get<MovieService>(MovieService);
//       movieController = moduleRef.get<MovieController>(MovieController);
//   });

//   describe('findAll', () => {
//     it('should return an array of cats', async () => {
//       const result = ['test'];
//       jest.spyOn(movieService, 'findAll').mockImplementation(() => result);

//       expect(await movieController.findAll()).toBe(result);
//     });
//   });
// });
