import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import { tbEmpAddress, tbEmployee, tbRegister, tbUser } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { EncryptService } from 'src/utils/crypto';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import { UsersService } from 'src/users/services/users/users.service';
import { tbCompany } from 'src/typeorm/tbCompany';
import { CompanyService } from 'src/company/services/company/company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbRegister,
      tbCompany,
      tbEmployee,
      tbEmpAddress,
      tbUser,
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
    EncryptService,
  ],
})
export class RegisterModule {}
