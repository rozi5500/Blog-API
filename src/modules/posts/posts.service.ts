import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../repositories/posts.repository';
import { Post } from '../../entities';
import { PostCreateDto } from './dto/post-create.dto';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async getPosts(): Promise<Post[]> {
    return this.postsRepository.findAllPosts();
  }

  async createPost(postData: PostCreateDto): Promise<Post> {
    return this.postsRepository.createPost(postData);
  }
}
