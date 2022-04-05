import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import {
  tbCompanyAddress, tbCompanyHoliday, tbCompanyWorkingDay,
  tbDepartment,
  tbEmpAddress, tbEmpEmployment, tbEmployee, tbEnum, tbPosition
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
    tbShift, tbShiftDetail])],
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
  ],
})
export class CompanyModule { }
