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
import { StatusMessage } from 'src/utils/StatusMessage';

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
  ) { }

  private register: Register[] = [];

  async findRegisterByID(id: any) {
    return await this.registerRepository.findOne({ id: id });
  }

  async findDuplicateRegister(createRegisterDto: CreateRegisterDto) {
    const data = { message: '', isResult: true };
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
        data['message'] = 'email is used';
        data['isResult'] = false;
      }
      if (data['message'] !== '') {
        data['message'] += '\n';
      }
      if (register.companyName === createRegisterDto.companyName) {
        data['message'] += 'company name is used';
        data['isResult'] = false;
      }
    }
    return data;
  }

  async createUser(createRegisterDto: CreateRegisterDto) {
    //try {
    createRegisterDto.isActivate = false;
    const register = await this.findDuplicateRegister(createRegisterDto);
    if (register.message !== '') {
      return register; //StatusMessage(false, register, null);
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
      newRegister['isResult'] = true;
      return newRegister;
    }
    // } catch (e) {
    //   StatusMessage(false, (e as Error).message, null);
    // }
  }

  async activateRegister(data: any) {
    try {
      const CheckRegister = await this.companyService.getByRegisterId(
        data.id,
      );
      if (CheckRegister.toString() !== '') {
        return { status: false, message: 'You have been already registered.' }; //StatusMessage(false, 'has already been registered', null);
        // return StatusMessage(false, 'You have been already registered', null);
      } else {
        const Update = await this.findRegisterByID(data.id);
        Update.activateDate = new Date();
        Update.isActivate = true;
        await this.registerRepository.save(Update);

        const createOrg = new CreateCompany();
        createOrg.registerId = data.id;
        createOrg.isDeleted = false;
        createOrg.companyName = data.companyName;
        createOrg.companyType = '1';
        createOrg.programStartDate = data.registerDate;
        createOrg.createdDate = new Date();
        const org = await this.companyService.create(createOrg);

        const createEmp = new CreateEmployee();
        createEmp.empCode = data.firstName;
        createEmp.firstName = data.firstName;
        createEmp.lastName = data.lastName;
        createEmp.companyId = org.id;
        createEmp.isDeleted = false;
        createEmp.createdDate = new Date();
        const emp = await this.employeeService.create(createEmp);

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
        // return StatusMessage(true, 'Confirmation register successfully.', null);
        return {
          status: true,
          message: 'Confirmation register is successfully.',
        };
      }
    } catch (e) {
      return StatusMessage(false, (e as Error).message, null);
    }
  }
}
