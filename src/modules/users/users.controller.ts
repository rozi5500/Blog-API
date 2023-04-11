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
import { Roles } from '../../common/decorators';
import { RolesEnum } from '../../common/enums';
import { JwtAuthGuard, RolesGuard } from '../auth';
import {
  ChangePasswordDto,
  ChangeUserRoleDto,
  CreateUserDto,
  UpdateUserDto,
  UserResponse,
} from './dto';
import { User } from '../../entities';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllUsers(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserById(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.findOne(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() userBody: CreateUserDto): Promise<UserResponse> {
    return this.usersService.createUser(userBody);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Body() userBody: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.updateUserById(userBody, id);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUserById(id);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Patch('update/role')
  async changeUserRole(@Body() body: ChangeUserRoleDto): Promise<User> {
    return this.usersService.changeUserRole(body);
  }

  @Post('change/password/:id')
  async changeUserPassword(
    @Body() passwords: ChangePasswordDto,
    @Param('id') id: string,
  ): Promise<void> {
    return this.usersService.changePassword(passwords, id);
  }
}
