import { Module } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';

const providers = [PostsRepository];
const entities = [Post];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers,
  exports: [...providers],
})
export class RepositoriesModule {}
