import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import {
  tbDepartment,
  tbEmpAddress,
  tbEmployee,
  tbPosition,
  tbRegister,
  tbUser,
  tbEmpEmployment,
  tbEnum,
  tbCompany,
  tbCompanyAddress,
  tbCompanyHoliday,
  tbCompanyWorkingDay,
  tbLocation,
} from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { EncryptService } from 'src/utils/crypto';
import { EmployeeService } from 'src/employee-module/employee/services/employee/employee.service';
import { UsersService } from 'src/users/services/users/users.service';
import { CompanyService } from 'src/compony-module/company/services/company/company.service';
import { PositionService } from 'src/compony-module/position/services/position/position.service';
import { DepartmentService } from 'src/compony-module/department/services/department/department.service';
import { tbShift } from 'src/typeorm/tbShift';
import { tbShiftDetail } from 'src/typeorm/tbShiftDetail';
import { ShiftService } from 'src/time-attendance-module/shift/services/shift/shift.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbRegister,
      tbCompany,
      tbEmployee,
      tbEmpAddress,
      tbEmpEmployment,
      tbUser,
      tbPosition,
      tbDepartment,
      tbEnum,
      tbCompanyAddress,
      tbCompanyHoliday,
      tbCompanyWorkingDay,
      tbShift,
      tbShiftDetail,
      tbLocation,
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
    {
      provide: 'SHIFT_SERVICE',
      useClass: ShiftService,
    },
    EncryptService,
  ],
})
export class RegisterModule {}
