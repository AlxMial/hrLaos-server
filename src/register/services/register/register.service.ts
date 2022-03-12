import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbRegister, tbUser, tbOrg } from '../../../typeorm';
import { Repository } from 'typeorm';
import { Register } from '../../types';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { MailService } from '../../../mail/services/mail/mail.service';
import { EncryptService } from 'src/utils/crypto';
import { CreateOrg } from 'src/organization/dtos/CreateOrg.dto';
import { OrganizationService } from 'src/organization/service/organization/organization.service';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(tbRegister)
    private readonly registerRepository: Repository<tbRegister>,
    private mailService: MailService,
    private encryptService: EncryptService,
    @Inject('ORGANIZATION_SERVICE')
    private readonly organizationService: OrganizationService,
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: EmployeeService,
    @Inject('USER_SERVICE')
    private readonly userService: UsersService,
  ) {}

  private register: Register[] = [];

  findRegisterByID(id: any) {
    return this.registerRepository.findOne({ id: id });
  }

  async activeRegister(Register: any) {
    console.log(Register);
  }

  async createUser(createRegisterDto: CreateRegisterDto) {
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

  async activateRegister(data: any) {
    const createOrg = new CreateOrg();
    createOrg.companyId = data.id;
    createOrg.isDeleted = false;
    createOrg.isFiscalYear = false;
    createOrg.isCalLeaveFiscalYear = false;
    createOrg.orgName = data.companyName;
    createOrg.orgType = 'HeadOffice';
    const org = await this.organizationService.createOrg(createOrg);

    const createEmp = new CreateEmployee();
    createEmp.companyId = data.id;
    createEmp.isDeleted = false;
    createEmp.isOver65 = false;
    createEmp.orgId = org.id;
    const emp = await this.employeeService.createEmp(createEmp);

    const createUser = new CreateUserDto();
    createUser.companyId = data.id;
    createUser.email = data.email;
    createUser.empId = emp.id;
    createUser.isActivate = true;
    createUser.password = data.password;
    createUser.role = 'administrator';
    createUser.userName = data.email;
    createUser.isDeleted = false;
    const user = await this.userService.createUserActivate(createUser);
    return 'Seccssfully';
  }
}
