import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../../entities';
import { AuthLoginResponse } from '../../common/types/auth-login-response.type';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';

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

  @Post('password/forgot')
  async forgotPassword(@Body() body: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(body);
  }

  @Post('password/restore')
  restorePassword(
    @Query('token') token: string,
    @Body() userData: RestorePasswordDto,
  ): Promise<void> {
    return this.authService.restorePassword(token, userData);
  }
}
