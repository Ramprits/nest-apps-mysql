import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Posts } from '../entities/Posts';

@Injectable()
export class PostService extends TypeOrmCrudService<Posts> {
  constructor(@InjectRepository(Posts) repo: Repository<Posts>) {
    super(repo);
  }
}
