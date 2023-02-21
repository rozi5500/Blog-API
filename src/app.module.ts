import { Module } from '@nestjs/common';
import { dbConfig } from './database/db-config';
import { PostsModule } from './modules/posts/posts.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [dbConfig(), PostsModule, UserModule],
})
export class AppModule {}
