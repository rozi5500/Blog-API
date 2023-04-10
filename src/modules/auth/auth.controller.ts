import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, JwtRefreshAuthGuard, LocalAuthGuard } from './guards';
import { User } from '../../entities';
import { AuthLoginResponse } from '../../common/types';
import { ForgotPasswordDto, RestorePasswordDto } from './dto';
import { AuthService } from './auth.service';

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
