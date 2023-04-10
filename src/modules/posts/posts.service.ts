import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { Post } from '../../entities';
import { CreatePostDto } from './dto/create-post.dto';
import { PostErrorMessagesEnum } from '../../common/enums';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilterWithPaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async getPosts(queryParams: FilterWithPaginationDto): Promise<Post[]> {
    return this.postsRepository.findAllPosts(queryParams);
  }

  async getOnePostById(id: string): Promise<Post> {
    const post = await this.postsRepository.findOnePost(id);

    if (!post) {
      throw new NotFoundException(PostErrorMessagesEnum.POST_NOT_FOUND);
    }

    return post;
  }

  async createPost(postData: CreatePostDto): Promise<Post> {
    return this.postsRepository.createPost(postData);
  }

  async updatePostById(postBody: UpdatePostDto, id: string): Promise<Post> {
    await this.getOnePostById(id);

    return this.postsRepository.updatePostById(postBody, id);
  }

  async deletePostById(id: string): Promise<void> {
    return this.postsRepository.deletePostById(id);
  }
}
