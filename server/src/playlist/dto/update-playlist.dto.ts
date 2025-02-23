import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayUnique()
  movie?: string[];

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isPrivate?: boolean;
}
