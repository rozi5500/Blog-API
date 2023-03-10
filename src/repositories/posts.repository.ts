import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../modules/posts/dto/create-post.dto';
import { UpdatePostDto } from '../modules/posts/dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async findAllPosts(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['comments'] });
  }

  async createPost(postData: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async findOnePost(id: string): Promise<Post> {
    return this.postsRepository.findOne({ where: { id } });
  }

  async updatePostById(postBody: UpdatePostDto, id: string): Promise<Post> {
    await this.postsRepository.save({ id, ...postBody });
    return this.findOnePost(id);
  }

  async deletePostById(id: string): Promise<void> {
    await this.postsRepository.delete({ id });
  }
}
