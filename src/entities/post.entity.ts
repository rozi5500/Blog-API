import {
  Column,
  Entity,
  // JoinColumn,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // @OneToMany(() => Comment, (comment) => comment.text)
  // @JoinColumn()
  // comments: Comment;

  @Column({ default: true })
  isActive: boolean;
}
