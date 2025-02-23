import { ApiProperty } from '@nestjs/swagger';
import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'email',
    example: 'lima@mail.ru',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'nickname', example: 'lima' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  username: string;

  @ApiProperty({
    required: false,
    enum: ['admin', 'user'],
    default: 'user',
    type: [String],
    description: 'роли',
    example: ['user'],
  })
  @IsOptional()
  @Equals('user')
  roles?: string[];

  @ApiProperty({
    required: true,
    type: String,
    description: 'пароль',
    example: '12345678',
    minimum: 8,
    maximum: 20
  })
  @IsNotEmpty() 
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

}
