import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserDocument } from 'src/user/user.schema';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiBody({ type: [CreateReviewDto] })
  
  async create(
    @Req() req: Request & { user: UserDocument },
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const { user } = req;
    return this.reviewService.create(createReviewDto, user);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'Review id' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'Review id' })
  @ApiBody({ type: [UpdateReviewDto] })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, description: 'Review id' })
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
