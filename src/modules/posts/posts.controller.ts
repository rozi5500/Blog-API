import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from '../../entities/post.entity';
import { PostCreateDto } from './dto/post-create.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.getPosts();
  }

  @Post('create')
  async createPost(@Body() post: PostCreateDto): Promise<PostEntity> {
    return this.postsService.createPost(post);
  }
}
