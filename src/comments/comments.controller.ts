import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Comments } from '../entities/Comments';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Crud({
  model: {
    type: Comments,
  },
  dto: {
    create: CreateCommentDto,
    update: UpdateCommentDto,
  },
})
@ApiTags('Comments')
@Controller('comments')
export class CommentsController implements CrudController<Comments> {
  constructor(public service: CommentsService) {}
}
