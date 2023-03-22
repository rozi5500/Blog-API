import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { UserResponse } from './dto/user.response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<UserResponse[]> {
    return this.userRepository.findAll();
  }

  async createUser(userBody: CreateUserDto): Promise<UserResponse> {
    const user = await this.hashPassword(userBody);
    return this.userRepository.createUser(user);
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

  async hashPassword(user: Partial<User>): Promise<any> {
    const salt = 10;
    const hashedPass = await bcrypt.hash(user.password, salt);

    return { ...user, password: hashedPass };
  }
}
