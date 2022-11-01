import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required field' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required field' })
  desc: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'User is required field' })
  @IsNumber()
  @IsPositive()
  userId: number;
}
