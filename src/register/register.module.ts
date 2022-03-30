import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import { tbDepartment, tbEmpAddress, tbEmployee, tbPosition, tbRegister, tbUser } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { EncryptService } from 'src/utils/crypto';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import { UsersService } from 'src/users/services/users/users.service';
import { tbCompany } from 'src/typeorm/tbCompany';
import { CompanyService } from 'src/company/services/company/company.service';
import { PositionService } from 'src/position/services/position/position.service';
import { DepartmentService } from 'src/department/services/department/department.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbRegister,
      tbCompany,
      tbEmployee,
      tbEmpAddress,
      tbUser,
      tbPosition,
      tbDepartment
    ]),
    MailModule,
  ],
  controllers: [RegisterController],
  providers: [
    {
      provide: 'REGISTER_SERVICE',
      useClass: RegisterService,
    },
    {
      provide: 'COMPANY_SERVICE',
      useClass: CompanyService,
    },
    {
      provide: 'EMPLOYEE_SERVICE',
      useClass: EmployeeService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    {
      provide: 'POSITION_SERVICE',
      useClass: PositionService,
    },
    {
      provide: 'DEPARTMENT_SERVICE',
      useClass: DepartmentService,
    },
    EncryptService,
  ],
})
export class RegisterModule { }
