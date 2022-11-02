import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        port: config.get<number>('MYSQLPORT'),
        host: config.get<string>('MYSQLHOST'),
        username: config.get<string>('MYSQLUSER'),
        database: config.get<string>('MYSQLDATABASE'),
        password: config.get<string>('MYSQLPASSWORD'),
        entities: [Comments, Likes, Posts, Relations, Stories, Users],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
