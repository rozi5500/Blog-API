import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../../entities';
import { AuthLoginResponse } from '../../common/types/auth-login-response.type';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AuthLoginResponse> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req): Promise<User> {
    return this.authService.getUsersProfile(req.user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshTokens(@Request() req): Promise<AuthLoginResponse> {
    return this.authService.refreshTokens(req.userId);
  }
}
