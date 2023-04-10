import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from '../repositories/repositories.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [RepositoriesModule, forwardRef(() => AuthModule), MailModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService, AuthService, MailService],
})
export class UsersModule {}
