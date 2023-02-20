import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from '../../entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.getPosts();
  }

  // TODO Type for postData
  @Post('create')
  async createPost(@Body() post: object): Promise<PostEntity> {
    return this.postsService.createPost(post);
  }
}
