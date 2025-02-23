import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    type: String,
    description: 'Название фильма',
    example: 'Терминатор',
    required: true,
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @ApiProperty({ type: Number, description: 'Год выпуска', example: 2023 })
  @IsNumber()
  @MinLength(2)
  @MaxLength(4)
  year: number;

  @ApiProperty({
    type: Number,
    description: 'Продолжительность фильма в минутах',
    example: 120,
  })
  @IsNumber()
  @MinLength(2)
  @MaxLength(3)
  duration: number;

  @ApiProperty({
    type: [String],
    description: 'Id жанра фильма',
    example: ['669e73554a5ff881af4af312', '669e73554a5ff881af4af504'],
  })
  @IsString()
  genre: string[];

  @ApiProperty({
    type: [String],
    description: 'Id режиссера фильма',
    example: ['669e74044a5ff881af4af314'],
  })
  @IsString()
  director: string[];

  @ApiProperty({
    type: [String],
    description: 'Id рецензий к фильму',
    example: ['669e74044a5ff881af4af314'],
  })
  @IsString()
  reviews?: string[];

  @ApiProperty({ type: String, description: 'Путь к постеру' })
  @IsString()
  poster_path: string;

  @ApiProperty({ type: Boolean, description: 'видео' })
  @IsBoolean()
  video?: boolean;

  @ApiProperty({ type: String, description: 'описание фильма' })
  @IsString()
  description: string;
}
