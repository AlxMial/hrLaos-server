import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { tbEmpAddress, tbEmployee } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(tbEmployee)
    private readonly empRepository: Repository<tbEmployee>,
    @InjectRepository(tbEmpAddress)
    private readonly addressRepository: Repository<tbEmpAddress>,
  ) {}

  getEmployeeAll() {
    const employee = this.empRepository.find();
    return employee;
  }

  getEmployeeByCompanyId(companyId: number) {
    const employee = this.empRepository.findOne({ companyId: companyId });
    return employee;
  }

  createEmp(createEmp: CreateEmployee) {
    const newEmp = this.empRepository.create(createEmp);
    return this.empRepository.save(newEmp);
  }

  async updateEmp(updateEmp: CreateEmployee) {
    try {
      const data = await this.empRepository.findOne(updateEmp.id);
      data.image = updateEmp.image;
      data.empCode = updateEmp.empCode;
      data.title = updateEmp.title;
      data.firstName = updateEmp.firstName;
      data.lastName = updateEmp.lastName;
      data.nickName = updateEmp.nickName;
      data.titleEn = updateEmp.titleEn;
      data.firstNameEn = updateEmp.firstNameEn;
      data.lastNameEn = updateEmp.lastNameEn;
      data.nickNameEn = updateEmp.nickNameEn;
      data.gender = updateEmp.gender;
      data.birthDate = updateEmp.birthDate;
      data.religion = updateEmp.religion;
      data.nationality = updateEmp.nationality;
      data.identificationNo = updateEmp.identificationNo;
      data.identityExpire = updateEmp.identityExpire;
      data.passportNo = updateEmp.passportNo;
      data.passportExpire = updateEmp.passportExpire;
      data.maritalDate = updateEmp.maritalDate;
      data.maritalStatus = updateEmp.maritalStatus;
      data.exemptReason = updateEmp.exemptReason;
      data.orgId = updateEmp.orgId;
      data.modifiedBy = updateEmp.userId;
      data.modifiedDate = new Date();
      return await this.empRepository.save(data);
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  async deleteEmp(data: deleteDto) {
    try {
      const deleteEmp = await this.empRepository.findOne(data.id);
      deleteEmp.isDeleted = true;
      deleteEmp.modifiedBy = data.userId;
      deleteEmp.modifiedDate = new Date();
      return await this.empRepository.save(deleteEmp);
    } catch (e) {
      return { message: (e as Error).message };
    }
  }
}
