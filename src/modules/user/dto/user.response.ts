import { UserDto } from './user.dto';
import { Comment, Post } from '../../../entities';

export class UserResponse extends UserDto {
  posts: Post[];
  comments: Comment[];
}
