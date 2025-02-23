import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async update(
    id: string,
    username?: string,
    playlists?: string[],
  ): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { username, playlists },
      {
        new: true,
      },
    );
  }

  async addUserRole(id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $addToSet: { roles: 'admin' } },
      {
        new: true,
      },
    );
  }

  async deleteUserRole(id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $pull: { roles: 'admin' } },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
