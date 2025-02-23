import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateDirectorDto {
  @ApiProperty({
    type: String,
    description: 'режиссер фильма',
    example: 'Дэвид Финчер',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @ApiProperty({
    type: Date,
    description: 'дата рождения',
    example: '1962-08-28',
  })
  @IsDateString()
  birthDate: Date;
}
