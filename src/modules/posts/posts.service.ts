import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../repositories/posts.repository';
import { Post } from '../../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async getPosts(): Promise<Post[]> {
    return this.postsRepository.findAllPosts();
  }

  // TODO Type for postData
  async createPost(postData: object): Promise<Post> {
    return this.postsRepository.createPost(postData);
  }
}
