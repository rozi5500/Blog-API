import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, User } from '../../entities';
import { UserRepository, PostsRepository } from '../repositories';

const providers = [PostsRepository, UserRepository];
const entities = [Post, User];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers,
  exports: [...providers],
})
export class RepositoriesModule {}
