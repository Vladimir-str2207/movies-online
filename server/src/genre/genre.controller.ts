import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Public } from 'src/decorators/public.decorator';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiBody({ type: [CreateGenreDto] })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.genreService.findAll();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return this.genreService.remove(id);
  }
}
