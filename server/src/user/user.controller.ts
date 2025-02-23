import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiTags, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UserDocument } from './user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/registration')
  @ApiBody({ type: [CreateUserDto] })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto) as UserDocument;
    const token = this.authService.generateToken(
      user.id,
      user.email,
      user.roles,
    );
    return { user, token };
  }

  @Get('/me')
  me(@Req() req: Request) {
    const { user } = req;
    return user;
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id/updateUser')
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @ApiBody({ type: [UpdateUserDto] })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { username, playlists } = updateUserDto;
    return this.userService.update(id, username, playlists);
  }

  @Roles(Role.Admin)
  @Patch(':id/addRole')
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @ApiBody({ type: [UpdateUserDto] })
  addUserRole(@Param('id') id: string) {
    return this.userService.addUserRole(id);
  }

  @Roles(Role.Admin)
  @Patch(':id/deleteRole')
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @ApiBody({ type: [UpdateUserDto] })
  deleteUserRole(@Param('id') id: string) {
    return this.userService.deleteUserRole(id);
  }


  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
