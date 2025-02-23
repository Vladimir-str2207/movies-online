import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ type: Number })
  moviesCount: number;
  
  @ApiProperty({ type: Number })
  playlistsCount: number;

  @ApiProperty({ type: Number })
  usersCount: number;
}
