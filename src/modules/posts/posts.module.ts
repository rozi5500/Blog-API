import { Module } from '@nestjs/common';
import { PostsService, PostsController } from '../posts';
import { RepositoriesModule } from '../repositories';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RepositoriesModule],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
})
export class PostsModule {}
