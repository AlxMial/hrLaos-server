import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee-module/employee/services/employee/employee.service';
import { ShiftService } from 'src/time-attendance-module/shift/services/shift/shift.service';
import {
  tbCompanyAddress, tbCompanyHoliday, tbCompanyWorkingDay,
  tbDepartment,
  tbEmpAddress, tbEmpEmployment, tbEmployee, tbEnum, tbLocation, tbPosition
} from 'src/typeorm';
import { tbCompany } from 'src/typeorm/tbCompany';
import { tbShift } from 'src/typeorm/tbShift';
import { tbShiftDetail } from 'src/typeorm/tbShiftDetail';
import { CompanyController } from './controllers/company/company.controller';
import { CompanyService } from './services/company/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([tbCompany, tbCompanyAddress, tbCompanyHoliday,
    tbCompanyWorkingDay, tbEnum, tbEmployee, tbEmpAddress,
    tbEmpEmployment, tbPosition, tbDepartment,
    tbShift, tbShiftDetail, tbLocation])],
  controllers: [CompanyController],
  providers: [
    {
      provide: 'COMPANY_SERVICE',
      useClass: CompanyService,
    },
    {
      provide: 'EMPLOYEE_SERVICE',
      useClass: EmployeeService,
    },
    {
      provide: 'SHIFT_SERVICE',
      useClass: ShiftService,
    },
  ],
})
export class CompanyModule { }
