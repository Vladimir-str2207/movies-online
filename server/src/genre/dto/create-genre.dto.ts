import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ type: String, description: 'жанр фильма', example: 'вестерн' })
  @IsString()
  genre: string;
}
