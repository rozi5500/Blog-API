import { Module } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, User } from '../../entities';
import { UserRepository } from './user.repository';

const providers = [PostsRepository, UserRepository];
const entities = [Post, User];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers,
  exports: [...providers],
})
export class RepositoriesModule {}
