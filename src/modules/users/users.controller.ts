import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from './dto/user.response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesEnum } from '../../common/enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ChangeUserRoleDto } from './dto/change-role.dto';
import { User } from '../../entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllUsers(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() userBody: CreateUserDto): Promise<UserResponse> {
    return this.userService.createUser(userBody);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Body() userBody: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.updateUserById(userBody, id);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUserById(id);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Patch('update/role')
  async changeUserRole(@Body() body: ChangeUserRoleDto): Promise<User> {
    return this.userService.changeUserRole(body);
  }

  @Post('change/password/:id')
  async changeUserPassword(
    @Body() passwords: ChangePasswordDto,
    @Param('id') id: string,
  ): Promise<void> {
    return this.userService.changePassword(passwords, id);
  }
}
