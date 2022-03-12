import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { tbEmpAddress, tbEmployee } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(tbEmployee)
    private readonly empRepository: Repository<tbEmployee>,
    @InjectRepository(tbEmpAddress)
    private readonly addressRepository: Repository<tbEmpAddress>,
  ) {}

  createEmp(createEmp: CreateEmployee) {
    const newEmp = this.empRepository.create(createEmp);
    return this.empRepository.save(newEmp);
  }

  getEmployeeAll() {
    const employee = this.empRepository.find();
    return employee;
  }
}
