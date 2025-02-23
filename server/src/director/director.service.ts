import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Director, DirectorDocument } from './director.schema';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<DirectorDocument>,
  ) {}
  create(createDirectorDto: CreateDirectorDto): Promise<Director> {
    const createdDirector = new this.directorModel(createDirectorDto);
    return createdDirector.save();
  }

  async findAll(): Promise<Director[]> {
    return this.directorModel.find();
  }

  async findOne(id: string): Promise<Director | null> {
    return this.directorModel.findById(id);
  }

  async update(
    id: string,
    updateDirectorDto: UpdateDirectorDto,
  ): Promise<Director | null> {
    return this.directorModel.findByIdAndUpdate(id, updateDirectorDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Director | null> {
    return this.directorModel.findByIdAndDelete(id);
  }
}
