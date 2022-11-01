import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { hashPassword } from '../utils';
import { Comments } from './Comments';
import { Likes } from './Likes';
import { Posts } from './Posts';
import { Relations } from './Relations';
import { Stories } from './Stories';

@Entity('users', { schema: 'social' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'user_name', length: 45 })
  userName: string;

  @Column('varchar', { name: 'email', length: 45 })
  email: string;

  @Exclude()
  @Column('varchar', { name: 'password', length: 100 })
  password: string;

  @Column('varchar', { name: 'first_name', nullable: true, length: 45 })
  firstName: string | null;

  @Column('varchar', { name: 'last_name', nullable: true, length: 45 })
  lastName: string | null;

  @Column('varchar', { name: 'profile_pic', nullable: true, length: 200 })
  profilePic: string | null;

  @Column('varchar', { name: 'web_site', nullable: true, length: 45 })
  webSite: string | null;

  @Column('varchar', { name: 'cover_picture', nullable: true, length: 245 })
  coverPicture: string | null;

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];

  @OneToMany(() => Relations, (relations) => relations.followingUser)
  relations: Relations[];

  @OneToMany(() => Relations, (relations) => relations.followedUser)
  relations2: Relations[];

  @OneToMany(() => Stories, (stories) => stories.user)
  stories: Stories[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashPassword(this.password);
  }
}
