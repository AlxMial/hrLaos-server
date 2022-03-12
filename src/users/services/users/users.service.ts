import { Injectable } from '@nestjs/common';
import { tbUser as UserEntity } from '../../../typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
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

  getUsersByCompanyId(companyId: number) {
    return this.userRepository.findOne({ companyId: companyId });
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.userName === username);
  }

  getUserByID(id: number) {
    return this.users.find((user) => user.id === id);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ userName: username });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ email: email });
  }

  findUserById(id: number) {
    return this.userRepository.findOne(id);
  }

  createUser(createuserDto: CreateUserDto) {
    const password = encodePassword(createuserDto.password);
    const newUser = this.userRepository.create({ ...createuserDto, password });
    return this.userRepository.save(newUser);
  }

  createUserActivate(createuserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createuserDto);
    return this.userRepository.save(newUser);
  }

  async updateUser(createUserDto: CreateUserDto) {
    const updateUser = await this.userRepository.findOne(createUserDto.id);
    updateUser.userName = createUserDto.userName;
    updateUser.email = createUserDto.email;
    updateUser.password = createUserDto.password;
    updateUser.role = createUserDto.role;
    updateUser.isActivate = createUserDto.isActivate;
    updateUser.modifiedBy = createUserDto.userId;
    updateUser.modifiedDate = new Date();
    return await this.userRepository.save(updateUser);
  }

  async deleteUser(data: any) {
    try {
      const updateUser = await this.userRepository.findOne(data.id);
      updateUser.isDeleted = true;
      updateUser.modifiedBy = data.userId;
      updateUser.modifiedDate = new Date();
      // this.userRepository.delete(id);
      return this.userRepository.save(updateUser);
    } catch (e) {
      return { message: (e as Error).message };
    }
  }
}
