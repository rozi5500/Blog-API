import { Module } from '@nestjs/common';
import { dbConfig } from './database/db-config';
import { AuthModule, MailModule, PostsModule, UsersModule } from './modules';

@Module({
  imports: [dbConfig(), PostsModule, UsersModule, AuthModule, MailModule],
})
export class AppModule {}
