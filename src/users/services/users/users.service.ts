import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbUser as UserEntity } from '../../../typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser, User } from '../../types';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: User[] = [];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const Password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, Password });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(UserName: string) {
    return this.userRepository.findOne({ UserName });
  }

  findUserById(id: number) {
    return this.userRepository.findOne(id);
  }
}
