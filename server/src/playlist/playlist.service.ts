import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist, PlaylistDocument } from './playlist.schema';
import { User, UserDocument } from 'src/user/user.schema';
import { MESSAGE } from 'src/constants/constants';
import mongoose from 'mongoose';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name)
    private playlistModel: Model<PlaylistDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto, user: UserDocument) {
    const createdPlaylist = new this.playlistModel(
      createPlaylistDto,
      (createPlaylistDto.user = user.id),
    );
    await this.addPlaylistToUser(user, createdPlaylist);
    return createdPlaylist.save();
  }

  async updateEntriesCount(id: string, counter: number) {
    await this.playlistModel.findByIdAndUpdate(id, {
      $inc: { entriesCount: counter },
    });
  }

  async addPlaylistToUser(user: UserDocument, playlist: PlaylistDocument) {
    const searchPlaylist = user.playlists.includes(playlist.id);
    if (searchPlaylist) {
      throw new ForbiddenException(MESSAGE.DUPLICATION);
    }
    user.playlists.push(playlist.id);
    await user.save();
  }

  async copyPlaylist(id: string, user: UserDocument): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(id);
    const isPrivate = !playlist || playlist.isPrivate;
    if (isPrivate) {
      throw new UnauthorizedException(MESSAGE.ACCESS_DENIED);
    }
    await this.addPlaylistToUser(user, playlist);
    await this.updateEntriesCount(id, 1);
    await this.userModel.updateOne(
      { _id: user.id },
      { playlists: user.playlists },
    );
    return playlist;
  }
  async removePlaylist(id: string, user: UserDocument): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(id);
    if (!playlist) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }
    await this.removePlaylistFromUser(user, playlist);
    await this.updateEntriesCount(id, -1);
    await this.userModel.updateOne(
      { _id: user.id },
      { playlists: user.playlists },
    );
    return playlist;
  }

  async removePlaylistFromUser(user: UserDocument, playlist: PlaylistDocument) {
    const indexPlaylist = user.playlists.indexOf(playlist.id);
    if (indexPlaylist === -1) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }
    user.playlists.splice(indexPlaylist, 1);
    await user.save();
  }

  async findAll(user?: UserDocument): Promise<Playlist[]> {
    if (user) {
      return this.playlistModel.find({
        $or: [{ isPrivate: false }, { user: user.id }],
      });
    }
    return this.playlistModel.find({ isPrivate: false });
  }

  async findOne(id: string, user?: UserDocument): Promise<Playlist | null> {
    if (user) {
      return this.playlistModel.findOne({ _id: id, user: user.id });
    }
    return this.playlistModel.findOne({ _id: id, isPrivate: false });
  }

  async update(
    id: string,
    updatePlaylistDto: UpdatePlaylistDto,
    user: UserDocument,
  ): Promise<Playlist | null> {
    return this.playlistModel.findOneAndUpdate(
      { _id: id, user: user.id },
      updatePlaylistDto,
      { new: true },
    );
  }

  async remove(id: string, user: UserDocument): Promise<Playlist | null> {
    return this.playlistModel.findOneAndDelete({
      _id: id,
      user: user.id,
    });
  }

  async removeMovie(id: string, session: mongoose.mongo.ClientSession) {
    return this.playlistModel.updateMany(
      { movie: id },
      { $pull: { movie: id } },
      { session, new: true },
    );
  }
}
