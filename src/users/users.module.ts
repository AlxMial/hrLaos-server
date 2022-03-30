import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentService } from 'src/department/services/department/department.service';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import { PositionService } from 'src/position/services/position/position.service';
import { tbDepartment, tbEmpAddress, tbEmployee, tbPosition, tbUser } from 'src/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([tbUser, tbEmployee, tbEmpAddress, tbPosition, tbDepartment])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
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
  ],
})
export class UsersModule { }
