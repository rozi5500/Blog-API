import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post, User } from '../entities';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
