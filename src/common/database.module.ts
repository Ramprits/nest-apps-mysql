import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Comments } from '../entities/Comments';
import { Likes } from '../entities/Likes';
import { Posts } from '../entities/Posts';
import { Relations } from '../entities/Relations';
import { Stories } from '../entities/Stories';
import { Users } from '../entities/Users';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: 'localhost',
        username: 'root',
        database: 'social',
        password: 'plumtree',
        entities: [Comments, Likes, Posts, Relations, Stories, Users],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
