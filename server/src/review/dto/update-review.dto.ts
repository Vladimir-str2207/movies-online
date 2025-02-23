import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { IsString } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty({
    type: String,
    description: 'текстовое сообщение-отзыв',
    example: ' Отличный фильм...',
    required: true,
  })
  @IsString()
  text?: string;
}
