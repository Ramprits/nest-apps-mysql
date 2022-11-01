import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required field' })
  desc: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'User is required field' })
  userId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'Post is required field' })
  postId: number;
}
