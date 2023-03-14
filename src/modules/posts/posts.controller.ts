import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from '../../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilterWithPaginationDto } from '../../common/dto/pagination.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Query() queryParams: FilterWithPaginationDto,
  ): Promise<PostEntity[]> {
    return this.postsService.getPosts(queryParams);
  }

  @Post('create')
  async createPost(@Body() post: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(post);
  }

  @Patch(':id')
  async updatePost(
    @Body() postBody: UpdatePostDto,
    @Param('id') id: string,
  ): Promise<PostEntity> {
    return this.postsService.updatePostById(postBody, id);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePostById(id);
  }
}
