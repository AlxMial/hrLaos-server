import { Injectable } from '@nestjs/common';
import { tbUser as UserEntity } from '../../../typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser, User } from '../../types';
import { InjectRepository } from '@nestjs/typeorm';
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
    // return this.users.map((user) => new SerializedUser(user));
    return this.userRepository.find();
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.UserName === username);
  }

  getUserByID(id: number) {
    return this.users.find((user) => user.UserID === id);
  }

  createUser(createuserDto: CreateUserDto) {
    const Password = encodePassword(createuserDto.Password);
    const newUser = this.userRepository.create({ ...createuserDto, Password });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ UserName: username });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ Email: email });
  }

  findUserById(id: number) {
    return this.userRepository.findOne(id);
  }
}
