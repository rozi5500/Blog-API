import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RepositoriesModule],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
})
export class PostsModule {}
