import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.schema';
import { Public } from 'src/decorators/public.decorator';
import { Permissions, Role } from 'src/auth/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { Request, Response } from 'express';
import { UserDocument } from 'src/user/user.schema';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { ApiTags, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PlaylistService } from 'src/playlist/playlist.service';
import { AuthService } from 'src/auth/auth.service';
import * as path from 'path';
import * as fs from 'fs';
import { UpdateRatingDto } from './dto/urdate-rating.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(
    @InjectConnection() private connection: mongoose.Connection,
    private readonly movieService: MovieService,
    private readonly playlistService: PlaylistService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: [CreateMovieDto] })
  @Roles(Role.Admin)
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    this.authService.checkPermissions(user, Permissions.MANAGE_REVIEWS);
    return this.movieService.create(createMovieDto);
  }

  @Get('export')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AccessGuard)
  async exportMoviesJson(
    @Req() req: Request & { user: UserDocument },
    @Res() response: Response,
  ) {
    const { user } = req;
    const movies = await this.movieService.findAll(user);
    const fileName = 'movies.json';

    const films = JSON.stringify(movies);

    await fs.promises.writeFile(fileName, films, 'utf8');
    const filePath = path.join(__dirname, '../../', fileName);
    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileName}`,
    );
    response.sendFile(filePath);
  }

  @Public()
  @Get('films')
  @UseGuards(AccessGuard)
  async findAll(
    @Req() req: Request & { user: UserDocument },
  ): Promise<Movie[] | string[]> {
    const { user } = req;
    return this.movieService.findAll(user);
  }

  @Public()
  @Get(':id/film')
  @ApiParam({ name: 'id', type: String, description: 'Movie id' })
  @UseGuards(AccessGuard)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ): Promise<Movie | null> {
    const { user } = req;
    return this.movieService.findOne(id, user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'Movie id' })
  @ApiBody({ type: [UpdateMovieDto] })
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() { title, year, duration, genre, director, poster_path, description }: UpdateMovieDto,
  ) {
    return this.movieService.update(id, { title, year, duration, genre, director, poster_path, description });
  }

  @Post(':id/addRating')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'Movie id' })
  @ApiBody({ type: [UpdateRatingDto] })
  async addRating(
    @Param('id') id: string,
    @Body() { voteCount }: UpdateRatingDto,
  ) {
    return this.movieService.addRating(id, { voteCount });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'Movie id' })
  @Roles(Role.Admin)
  async removeMovie(@Param('id') id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.playlistService.removeMovie(id, session);
      await this.movieService.remove(id, session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
