import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  Max,
  Min,
} from 'class-validator';

export class UpdateRatingDto extends PartialType(CreateMovieDto) {
//   @ApiProperty({ type: Number })
//   @IsNumber()
//   rating?: number;

  @ApiProperty({ type: Number, description: 'оценка фильма', example: 5 })
  @IsNumber()
  @Min(1)
  @Max(10)
  voteCount?: number[];
}