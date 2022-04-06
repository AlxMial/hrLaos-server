import { Inject, Injectable } from '@nestjs/common';
import { tbUser as UserEntity } from '../../../typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from '../../types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { StatusMessage } from 'src/utils/StatusMessage';
import { EmployeeService } from 'src/employee-module/employee/services/employee/employee.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: EmployeeService,
  ) { }

  private users: User[] = [];

  async getUsers() {
    // return this.users.map((user) => new SerializedUser(user));
    //try {
    //return StatusMessage(true, null, await this.userRepository.find());
    return await this.userRepository.find();
    // } catch (e) {
    //   return StatusMessage(false, (e as Error).message, null);
    // }
  }

  async getUsersByCompanyId(companyId: number) {
    //try {
    // return StatusMessage(
    //   true,
    //   null,
    //   await this.userRepository.find({ companyId: companyId }),
    // );
    return await this.userRepository.find({ companyId: companyId });
    // } catch (e) {
    //   return StatusMessage(false, (e as Error).message, null);
    // }
  }

  // async getUserByUsername(username: string) {
  //   //try {
  //   // return StatusMessage(
  //   //   true,
  //   //   null,
  //   //   await this.userRepository.find({ userName: username }),
  //   // );
  //   return await this.userRepository.find({ userName: username });
  //   // } catch (e) {
  //   //   return StatusMessage(false, (e as Error).message, null);
  //   // }
  // }

  // async getUserByID(id: number) {
  //   //try {
  //   // return StatusMessage(
  //   //   true,
  //   //   null,
  //   //   await this.userRepository.find({ id: id }),
  //   // );
  //   const data = await this.userRepository.find({ id: id });
  //   return data;
  //   // } catch (e) {
  //   //   return StatusMessage(false, (e as Error).message, null);
  //   // }
  // }

  // getUserByUsername(username: string) {
  //   return this.users.find((user) => user.userName === username);
  // }

  // async getUserByID(id: number) {
  //   return this.users.find((user) => user.id === id);
  // }

  async findUserByUsername(username: string) {
    //try {
    const User = await this.userRepository.findOne({ userName: username });
    if (User) {
      const emp = await this.employeeService.getById(
        User.empId,
        User.companyId,
      );
      User['img'] = emp.employee.image;
      return User;
    } else return null;
    // const tbUser = {
    //   id: User.id,
    //   empId: User.empId,
    //   userName: User.userName,
    //   password: User.password,
    //   role: User.role,
    //   isActivate: User.isActivate,
    //   companyId: User.companyId,
    //   isDeleted: User.isDeleted,
    //   img: Employee.image,
    // };
    // User['img'] = emp.employee.image;
    // const data = { tbUser, tbEmployee };
    // return User; //StatusMessage(true, null, data);
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }

  async findUserByEmail(email: string) {
    //try {
    return await this.userRepository.findOne({ email: email });
    // return StatusMessage(
    //   true,
    //   null,
    //   await this.userRepository.findOne({ email: email }),
    // );
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }

  async findUserById(id: number) {
    //try {
    return await this.userRepository.findOne(id);
    //return StatusMessage(true, null, await ;
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }

  async createUser(createuserDto: CreateUserDto) {
    //try {
    const password = encodePassword(createuserDto.password);
    const newUser = this.userRepository.create({
      ...createuserDto,
      password,
    });
    return await this.userRepository.save(newUser); //StatusMessage(true, null, await this.userRepository.save(newUser));
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }

  async createUserActivate(createuserDto: CreateUserDto) {
    //try {
    const newUser = this.userRepository.create(createuserDto);
    return await this.userRepository.save(newUser); //StatusMessage(true, null, await this.userRepository.save(newUser));
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }

  async updateUser(createUserDto: CreateUserDto) {
    //try {
    const updateUser = await this.userRepository.findOne(createUserDto.id);
    updateUser.userName = createUserDto.userName;
    updateUser.email = createUserDto.email;
    updateUser.password = createUserDto.password;
    updateUser.role = createUserDto.role;
    updateUser.isActivate = createUserDto.isActivate;
    updateUser.modifiedBy = createUserDto.userId;
    updateUser.modifiedDate = new Date();
    updateUser.isDeleted = false;
    // return StatusMessage(
    //   true,
    //   null,
    //   await this.userRepository.save(updateUser),
    // );
    return await this.userRepository.save(updateUser);
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }

  async deleteUser(data: any) {
    //try {
    const updateUser = await this.userRepository.findOne(data.id);
    updateUser.isDeleted = true;
    updateUser.modifiedBy = data.userId;
    updateUser.modifiedDate = new Date();
    // this.userRepository.delete(id);
    // return StatusMessage(
    //   true,
    //   null,
    //   await this.userRepository.save(updateUser),
    // );
    return await this.userRepository.save(updateUser);
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }
}
