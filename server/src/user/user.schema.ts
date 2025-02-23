import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { Playlist } from 'src/playlist/playlist.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  username: string;

  @Prop({ default: [Role.User] })
  roles: Role[];

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', unique: true },
    ],
  })
  playlists: Playlist[];
}

export const UserSchema = SchemaFactory.createForClass(User);
