import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities';
import { ILike, Repository } from 'typeorm';
import { CreatePostDto } from '../modules/posts/dto/create-post.dto';
import { UpdatePostDto } from '../modules/posts/dto/update-post.dto';
import { FilterWithPaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async findAllPosts(queryParams: FilterWithPaginationDto): Promise<Post[]> {
    const { page = 1, offset = 15, filter } = queryParams;

    const options = {
      relations: ['comments'],
      take: offset,
      skip: page - 1,
    };

    if (!filter) {
      return this.postsRepository.find(options);
    }

    return this.postsRepository.find({
      ...options,
      where: { title: ILike(filter) },
    });
  }

  async createPost(postData: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async findOnePost(id: string): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  async updatePostById(postBody: UpdatePostDto, id: string): Promise<Post> {
    await this.postsRepository.save({ id, ...postBody });
    return this.findOnePost(id);
  }

  async deletePostById(id: string): Promise<void> {
    await this.postsRepository.delete({ id });
  }
}
