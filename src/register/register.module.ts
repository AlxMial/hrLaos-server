import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import {
  tbEmpAddress,
  tbEmployee,
  tbOrg,
  tbOrgAddress,
  tbRegister,
  tbUser,
} from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { EncryptService } from 'src/utils/crypto';
import { OrganizationService } from 'src/organization/service/organization/organization.service';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbRegister,
      tbOrg,
      tbOrgAddress,
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
      provide: 'ORGANIZATION_SERVICE',
      useClass: OrganizationService,
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
