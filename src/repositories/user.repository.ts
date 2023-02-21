import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // TODO return type
  async findAll(): Promise<any> {
    return this.userRepository.find({
      relations: ['posts', 'comments'],
    });
  }
}
