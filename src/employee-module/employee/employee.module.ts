import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentService } from 'src/compony-module/department/services/department/department.service';
import { PositionService } from 'src/compony-module/position/services/position/position.service';
import { ShiftService } from 'src/time-attendance-module/shift/services/shift/shift.service';
import { tbDepartment, tbEmpAddress, tbPosition, tbEmpEmployment, tbLocation } from 'src/typeorm';
import { tbEmployee } from 'src/typeorm/tbEmployee';
import { tbEnum } from 'src/typeorm/tbEnum';
import { tbShift } from 'src/typeorm/tbShift';
import { tbShiftDetail } from 'src/typeorm/tbShiftDetail';
import { EncryptService } from 'src/utils/crypto';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './services/employee/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([tbEmployee, tbEmpAddress,
    tbPosition, tbDepartment, tbEmpEmployment, tbEnum,
    tbShift, tbShiftDetail, tbLocation])],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'EMPLOYEE_SERVICE',
      useClass: EmployeeService,
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
export class EmployeeModule { }
