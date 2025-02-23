import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Movie } from 'src/movie/movie.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop({ required: true })
  text: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movie: Movie;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
