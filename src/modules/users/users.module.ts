import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
