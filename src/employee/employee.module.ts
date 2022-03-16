import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbEmpAddress } from 'src/typeorm';
import { tbEmployee } from 'src/typeorm/tbEmployee';
import { EncryptService } from 'src/utils/crypto';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './services/employee/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([tbEmployee, tbEmpAddress])],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'EMPLOYEE_SERVICE',
      useClass: EmployeeService,
    },
    EncryptService,
  ],
})
export class EmployeeModule {}
