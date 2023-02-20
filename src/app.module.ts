import { Module } from '@nestjs/common';
import { dbConfig } from './database/db-config';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [dbConfig(), PostsModule],
})
export class AppModule {}
