import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comments } from './Comments';
import { Likes } from './Likes';
import { Users } from './Users';

@Index('post_user_id_idx', ['userId'], {})
@Entity('posts', { schema: 'social' })
export class Posts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 45 })
  title: string;

  @Column('varchar', { name: 'desc', length: 1024 })
  desc: string;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likes: Likes[];

  @ManyToOne(() => Users, (users) => users.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
