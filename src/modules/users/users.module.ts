import { forwardRef, Module } from '@nestjs/common';
import { UsersService, UsersController } from '../users';
import { RepositoriesModule } from '../repositories';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail';

@Module({
  imports: [RepositoriesModule, forwardRef(() => AuthModule), MailModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService, AuthService, MailService],
})
export class UsersModule {}
