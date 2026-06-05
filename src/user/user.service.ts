import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterDto } from '../user/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createUser(dto: RegisterDto) {
    const existingUser = await this.users.findOneBy({ username: dto.username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.users.create({ username: dto.username, passwordHash });
    return this.users.save(user);
  }
}
