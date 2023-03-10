import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from './dto/user.response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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

  @Patch(':id')
  async updateUser(
    @Body() userBody: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<any> {
    return this.userService.updateUserById(userBody, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
