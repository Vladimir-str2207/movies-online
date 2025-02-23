import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
    description: 'email',
    example: 'lima@mail.ru',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'пароль',
    example: '1234u345',
  })
  @IsString()
  password: string;
}
