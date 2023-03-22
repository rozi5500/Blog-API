import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { UserResponse } from './dto/user.response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<UserResponse[]> {
    return this.userRepository.findAll();
  }

  async createUser(userBody: CreateUserDto): Promise<UserResponse> {
    return this.userRepository.createUser(userBody);
  }

  async updateUserById(userBody: UpdateUserDto, id: string): Promise<any> {
    await this.findOne(id);

    return this.userRepository.updateUserById(userBody, id);
  }

  async deleteUserById(id: string): Promise<void> {
    return this.userRepository.removeUserById(id);
  }

  async findOne(param: string | number, field = 'id'): Promise<User> {
    return this.userRepository.findOne(param, field);
  }
}
