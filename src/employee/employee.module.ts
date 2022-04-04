import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentService } from 'src/department/services/department/department.service';
import { PositionService } from 'src/position/services/position/position.service';
import { tbDepartment, tbEmpAddress, tbPosition, tbEmpEmployment } from 'src/typeorm';
import { tbEmployee } from 'src/typeorm/tbEmployee';
import { tbEnum } from 'src/typeorm/tbEnum';
import { EncryptService } from 'src/utils/crypto';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './services/employee/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([tbEmployee, tbEmpAddress, tbPosition, tbDepartment, tbEmpEmployment, tbEnum])],
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
    EncryptService,
  ],
})
export class EmployeeModule { }
