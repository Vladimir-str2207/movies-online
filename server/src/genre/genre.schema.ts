import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema()
export class Genre {
  @Prop({ unique: true })
  genre: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
