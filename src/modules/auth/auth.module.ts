import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from '../users';
import { UsersModule } from '../users/users.module';
import { RepositoriesModule } from '../repositories';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail';
import {
  AuthService,
  JwtRefreshStrategy,
  JwtStrategy,
  LocalStrategy,
  AuthController,
} from '../auth';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_EXPIRES_IN },
    }),
    forwardRef(() => UsersModule),
    RepositoriesModule,
    PassportModule,
    MailModule,
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    MailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
