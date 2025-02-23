import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({
    type: String,
    description: 'Название плейлиста',
    example: 'my',
    required: true,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title: string;

  @ApiProperty({
    type: [String],
    description: 'Id фильма',
    example: [
      '66ab681e9fd1fd4b046b880d',
      '66ab67d29fd1fd4b046b880a',
      { unique: true },
    ],
  })
  @IsArray()
  @ArrayUnique()
  movie: string[];

  @ApiProperty({
    type: [String],
    description: 'Id пользователя',
    example: ['66a7c56b69efd19a0972f173'],
  })
  @IsArray()
  user?: string;

  @ApiProperty({
    type: Boolean,
    description: 'приватный/публичный',
    default: true,
  })
  @IsBoolean()
  isPrivate?: boolean;
}
