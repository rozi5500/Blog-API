import { Module } from '@nestjs/common';
import { dbConfig } from './database/db-config';
import { UsersModule, AuthModule, PostsModule } from './modules';

@Module({
  imports: [dbConfig(), PostsModule, UsersModule, AuthModule],
})
export class AppModule {}
