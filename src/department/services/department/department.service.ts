import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { departmentDto } from 'src/department/dtos/department.dto';
import { tbDepartment } from 'src/typeorm';
import { StatusMessage } from 'src/utils/StatusMessage';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(tbDepartment)
    private readonly departmentRepository: Repository<tbDepartment>,
    private readonly connection: Connection,
  ) { }

  async getDepartmentAll() {
    const department = this.departmentRepository;
    try {
      const depart = await this.departmentRepository.find({ isDeleted: false });
      return StatusMessage(true, null, depart);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }

  async getDepartmentByCompanyId(id: any) {
    const department = this.departmentRepository;
    try {
      const depart = await this.departmentRepository.find({ id: id });
      return StatusMessage(true, null, depart);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }

  async getDepartmentByEmpId(id: number, companyId: number) {
    try {
      const data = await this.departmentRepository.findOne({
        id: id,
        companyId: companyId,
      });
      return StatusMessage(true, null, data);;
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  async createDepartment(createDepartment: departmentDto) {
    const department = this.departmentRepository;
    try {
      const newDepartment = this.departmentRepository.create(createDepartment);
      const SaveDepartment = await this.departmentRepository.save(newDepartment);
      return StatusMessage(true, null, SaveDepartment);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }

  async updateDepartment(updateDepartment: departmentDto) {
    const department = this.departmentRepository;
    try {
      const data = await this.departmentRepository.findOne(updateDepartment.id);
      data.departmentCode = updateDepartment.departmentCode;
      data.departmentName = updateDepartment.departmentName;
      data.departmentNameEn = updateDepartment.departmentNameEn;
      data.mainDepartmentId = updateDepartment.mainDepartmentId;
      data.description = updateDepartment.description;
      data.modifiedBy = updateDepartment.userId;
      data.modifiedDate = new Date();
      data.isDeleted = false;
      return StatusMessage(
        true,
        null,
        await this.departmentRepository.save(data),
      );
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }

  async delete(data: departmentDto) {
    const department = this.departmentRepository;
    try {
      const result = await this.connection.query(
        "up_selectAllUse @SearchStr='" + data.id + "',@Column='empId'",
      );
      if (result) {
        return StatusMessage(false, 'data is used', department);
      } else {
        const deleteEmp = await this.departmentRepository.findOne(data.id);
        deleteEmp.isDeleted = true;
        deleteEmp.modifiedBy = data.userId;
        deleteEmp.modifiedDate = new Date();
        return StatusMessage(
          true,
          null,
          await this.departmentRepository.save(deleteEmp),
        );
      }
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }
}
