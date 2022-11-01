import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("id_UNIQUE", ["id"], { unique: true })
@Index("following_user_id_idx", ["followingUserId"], {})
@Index("follwed_user_id_idx", ["followedUserId"], {})
@Entity("relations", { schema: "social" })
export class Relations {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "following_user_id" })
  followingUserId: number;

  @Column("int", { name: "followed_user_id" })
  followedUserId: number;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.relations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "following_user_id", referencedColumnName: "id" }])
  followingUser: Users;

  @ManyToOne(() => Users, (users) => users.relations2, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "followed_user_id", referencedColumnName: "id" }])
  followedUser: Users;
}
