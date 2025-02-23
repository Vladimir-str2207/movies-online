import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @ApiProperty()
  @Prop()
  moviesCount: number;

  @ApiProperty()
  @Prop()
  playlistsCount: number;

  @ApiProperty()
  @Prop()
  usersCount: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
