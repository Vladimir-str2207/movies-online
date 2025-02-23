import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre, GenreDocument } from './genre.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const createdGenre = new this.genreModel(createGenreDto);
    return createdGenre.save();
  }

  async findAll(): Promise<Genre[]> {
    return this.genreModel.find();
  }

  async remove(id: string): Promise<Genre | null> {
    return this.genreModel.findByIdAndDelete(id);
  }

}
