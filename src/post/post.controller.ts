import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Posts } from '../entities/Posts';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Crud({
  model: {
    type: Posts,
  },
  query: {
    limit: 10,
    alwaysPaginate: true,
  },
  dto: {
    create: CreatePostDto,
    update: UpdatePostDto,
  },
})
@ApiTags('Posts')
@Controller('posts')
export class PostController implements CrudController<Posts> {
  constructor(public service: PostService) {}
}
