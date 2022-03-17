import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbRegister } from '../../../typeorm';
import { Repository } from 'typeorm';
import { Register } from '../../types';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { MailService } from '../../../mail/services/mail/mail.service';
import { EncryptService } from 'src/utils/crypto';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { CompanyService } from 'src/company/services/company/company.service';
import { CreateCompany } from 'src/company/dtos/CreateCompany.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(tbRegister)
    private readonly registerRepository: Repository<tbRegister>,
    private mailService: MailService,
    private encryptService: EncryptService,
    @Inject('COMPANY_SERVICE')
    private readonly companyService: CompanyService,
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: EmployeeService,
    @Inject('USER_SERVICE')
    private readonly userService: UsersService,
  ) {}

  private register: Register[] = [];

  findRegisterByID(id: any) {
    return this.registerRepository.findOne({ id: id });
  }

  async findDuplicateRegister(createRegisterDto: CreateRegisterDto) {
    const data = { email: '', companyName: '' };
    const register = await this.registerRepository
      .createQueryBuilder('tbRegister')
      .where(
        'tbRegister.email = :email or tbRegister.companyName = :companyName',
        {
          email: createRegisterDto.email,
          companyName: createRegisterDto.companyName,
        },
      )
      .getOne();
    if (register) {
      if (register.email === createRegisterDto.email) {
        data['email'] = 'email is used';
      }
      if (register.companyName === createRegisterDto.companyName) {
        data['companyName'] = 'company name is used';
      }
    }
    return data;
  }

  async createUser(createRegisterDto: CreateRegisterDto) {
    const register = await this.findDuplicateRegister(createRegisterDto);
    if (register.email !== '' || register.companyName !== '') {
      return register;
    } else {
      const password = encodePassword(createRegisterDto.password);
      const newRegister = this.registerRepository.create({
        ...createRegisterDto,
        password,
      });
      await this.registerRepository.save(newRegister).then((e) => {
        const token = this.encryptService.EncodeKey(e.id);
        this.mailService.sendUserConfirmation(e, token);
        console.log(token);
      });
      return newRegister;
    }
  }

  async activateRegister(data: any) {
    const createOrg = new CreateCompany();
    createOrg.registerId = data.id;
    createOrg.isDeleted = false;
    createOrg.companyName = data.companyName;
    createOrg.companyType = '1';
    createOrg.createdDate = new Date();
    const org = await this.companyService.createCompany(createOrg);

    const createEmp = new CreateEmployee();
    createEmp.companyId = org.id;
    createEmp.isDeleted = false;
    createEmp.createdDate = new Date();
    const emp = await this.employeeService.createEmp(createEmp);

    const createUser = new CreateUserDto();
    createUser.companyId = org.id;
    createUser.email = data.email;
    createUser.empId = emp.id;
    createUser.isActivate = true;
    createUser.password = data.password;
    createUser.role = 'administrator';
    createUser.userName = data.email;
    createUser.isDeleted = false;
    createUser.createdDate = new Date();
    const user = await this.userService.createUserActivate(createUser);
    return 'Seccssfully';
  }
}
