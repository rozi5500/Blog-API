import { Module } from '@nestjs/common';
import { dbConfig } from './database/db-config';
import { UsersModule, AuthModule, PostsModule } from './modules';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [dbConfig(), PostsModule, UsersModule, AuthModule, MailModule],
})
export class AppModule {}
