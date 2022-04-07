import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbDepartment } from 'src/typeorm';
import { DepartmentController } from './controllers/department/department.controller';
import { DepartmentService } from './services/department/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([tbDepartment])],
  controllers: [DepartmentController],
  providers: [
    {
      provide: 'DEPARTMENT_SERVICE',
      useClass: DepartmentService,
    },
  ],
})
export class DepartmentModule {}
