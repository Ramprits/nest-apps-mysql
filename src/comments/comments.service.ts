import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Comments } from '../entities/Comments';

@Injectable()
export class CommentsService extends TypeOrmCrudService<Comments> {
  constructor(@InjectRepository(Comments) repo: Repository<Comments>) {
    super(repo);
  }
}
