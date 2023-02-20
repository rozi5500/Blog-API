import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async findAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  // TODO Type for postData
  async createPost(postData: object): Promise<Post> {
    return this.postsRepository.save(postData);
  }
}
