import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: String, description: 'nickname', example: 'lima' })
  @IsString()
  @Length(3, 15)
  username?: string;

  @ApiProperty({
    required: false,
    enum: ['admin', 'user'],
    default: 'user',
    type: [String],
    description: 'роли',
    example: ['admin'],
  })

  @ApiProperty({
    type: [String],
    description: 'Id плейлистов',
    example: ['66b0e5fb43477e523f52aa95'],
  })
  @IsOptional()
  @IsString()
  playlists?: string[];
}
