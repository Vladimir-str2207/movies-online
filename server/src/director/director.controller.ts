import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Public } from 'src/decorators/public.decorator';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiTags, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('director')
@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiBody({ type: [DirectorService] })
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'Director id' })
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'Director id' })
  @ApiBody({ type: [UpdateDirectorDto] })
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.update(id, updateDirectorDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'Director id' })
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return this.directorService.remove(id);
  }
}
