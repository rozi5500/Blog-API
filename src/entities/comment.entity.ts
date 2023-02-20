import {
  // Column,
  Entity,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Post)
  // @JoinColumn({ referencedColumnName: 'id' })
  // text: string;
}
