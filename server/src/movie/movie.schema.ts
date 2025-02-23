import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Director } from 'src/director/director.schema';
import { Genre } from 'src/genre/genre.schema';
import { Review } from 'src/review/review.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop()
  year: number;

  @Prop()
  duration: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genre: Genre[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }] })
  director: Director[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];

  @Prop()
  poster_path: string;

  @Prop({ default: false })
  video: boolean;

  @Prop({ default: 1 })
  rating: number;

  @Prop({ default: 1 })
  voteCount: [number];

  @Prop({ default: " Отличный фильм! " })
  description: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
