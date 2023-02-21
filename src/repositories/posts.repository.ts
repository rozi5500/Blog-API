import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities';
import { Repository } from 'typeorm';
import { PostCreateDto } from '../modules/posts/dto/post-create.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async findAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async createPost(postData: PostCreateDto): Promise<Post> {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }
}
