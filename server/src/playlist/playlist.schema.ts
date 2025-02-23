import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from 'src/movie/movie.schema';
import { User } from 'src/user/user.schema';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        index: { unique: true },
      },
    ],
  })
  movie: Movie[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;

  @Prop({ default: true })
  isPrivate: boolean;

  @Prop({default:1})
  entriesCount: number;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
