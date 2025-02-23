import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Public } from '../decorators/public.decorator';
import { Request } from 'express';
import { UserDocument } from 'src/user/user.schema';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { MESSAGE } from 'src/constants/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @ApiBody({ type: [CreatePlaylistDto] })
  async create(
    @Req() req: Request & { user: UserDocument },
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    const { user } = req;
    return this.playlistService.create(createPlaylistDto, user);
  }

  @Post(':id/copy')
  @ApiParam({ name: 'id', type: String, description: 'Playlist id' })
  copyPlaylist(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    return this.playlistService.copyPlaylist(id, user);
  }

  @Patch(':id/remove')
  @ApiParam({ name: 'id', type: String, description: 'Playlist id' })
  removePlaylist(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    return this.playlistService.removePlaylist(id, user);
  }

  @Get()
  @Public()
  @UseGuards(AccessGuard)
  async findAll(@Req() req: Request & { user: UserDocument }) {
    const { user } = req;
    return this.playlistService.findAll(user);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'Playlist id' })
  @Public()
  @UseGuards(AccessGuard)
  async findOne(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    const playlist = await this.playlistService.findOne(id, user);
    return playlist ?? MESSAGE.ACCESS_DENIED;
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String, description: 'Playlist id' })
  @ApiBody({ type: [UpdatePlaylistDto] })
  @UseGuards(AccessGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    const playlist = await this.playlistService.update(
      id,
      updatePlaylistDto,
      user,
    );
    return playlist ?? MESSAGE.ACCESS_DENIED;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'Playlist id' })
  @UseGuards(AccessGuard)
  remove(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    return this.playlistService.remove(id, user);
  }
}
