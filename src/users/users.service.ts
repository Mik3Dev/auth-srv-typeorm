import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async register(createUserDTO: CreateUserDTO): Promise<void> {
    const { username, email, password } = createUserDTO;

    const userByUsername = await this.usersRepository.findOne({ username });
    if (userByUsername) {
      throw new BadRequestException('Username already taken.');
    }

    const userByEmail = await this.usersRepository.findOne({ email });
    if (userByEmail) {
      throw new BadRequestException('Email already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersRepository.save({
      username,
      email,
      password: hashedPassword,
    });
  }

  async activateUser(id: string): Promise<void> {
    const user = await this.findOneById(id);
    user.isActive = true;
    await this.usersRepository.save(user);
  }

  async deactivateUser(id: string): Promise<void> {
    const user = await this.findOneById(id);
    user.isActive = false;
    await this.usersRepository.save(user);
  }

  async changePassword(id: string, password): Promise<void> {
    const user = await this.findOneById(id);
    user.password = await bcrypt.hash(password, 10);
    await this.usersRepository.save(user);
  }
}
