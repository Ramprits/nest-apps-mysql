import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';
import { Users } from './Users';

@Index('comment_user_id_idx', ['userId'], {})
@Index('comment_post_id_idx', ['postId'], {})
@Entity('comments', { schema: 'social' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'desc', length: 205 })
  desc: string;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'post_id' })
  postId: number;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(() => Posts, (posts) => posts.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  post: Posts;

  @ManyToOne(() => Users, (users) => users.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
