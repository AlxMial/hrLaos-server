import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { departmentDto } from 'src/compony-module/department/dtos/department.dto';
import { tbDepartment } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { getDto } from 'src/typeorm/dtos/getDto.dto';
import { stampAudit } from 'src/utils/stamp-audit';
import { StatusMessage } from 'src/utils/StatusMessage';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(tbDepartment)
    private readonly departmentRepository: Repository<tbDepartment>,
    private readonly connection: Connection,
  ) { }

  async getList(params: getDto) {
    const department = this.departmentRepository;
    try {
      const depart = await this.departmentRepository.find({
        isDeleted: false,
        companyId: params.companyId
      });
      return StatusMessage(true, null, depart);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }

  async getByCompanyId(id: any) {
    const department = this.departmentRepository;
    try {
      const depart = await this.departmentRepository.find({
        isDeleted: false,
        id: id
      });
      return StatusMessage(true, null, depart);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }

  async getById(id: number, companyId: number) {
    try {
      const data = await this.departmentRepository.findOne({
        isDeleted: false,
        id: id,
        companyId: companyId,
      });
      return StatusMessage(true, null, data);;
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  async create(createDepartment: departmentDto) {
    const department = this.departmentRepository;
    // return StatusMessage(false, 'test', department);
    try {
      stampAudit(createDepartment);
      const newDepartment = this.departmentRepository.create(createDepartment);
      const SaveDepartment = await this.departmentRepository.save(newDepartment);
      return StatusMessage(true, null, SaveDepartment);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }

  async update(updateDepartment: departmentDto) {
    const department = this.departmentRepository;
    try {
      // updateDepartment = stampAudit(updateDepartment, 'update');
      let data = await this.departmentRepository.findOne({
        isDeleted: false,
        id: updateDepartment.id,
        companyId: updateDepartment.companyId
      });
      data.departmentCode = updateDepartment.departmentCode;
      data.departmentName = updateDepartment.departmentName;
      data.departmentNameEn = updateDepartment.departmentNameEn;
      data.mainDepartmentId = updateDepartment.mainDepartmentId;
      data.description = updateDepartment.description;
      stampAudit(data, updateDepartment, 'update');
      return StatusMessage(
        true,
        null,
        await this.departmentRepository.save(data),
      );
    } catch (e) {
      return StatusMessage(false, (e as Error).message, department);
    }
  }

  async delete(data: deleteDto) {
    const department = this.departmentRepository;
    // try {
    for (let i = 0; i < data.id.length; i++) {
      const result = await this.connection.query(
        "up_selectAllUse @SearchStr='" + data.id[i] + "',@Column='departmentId', @exceptTable='tbDepartment', @companyId='" + data.companyId + "'",
      );
      if (result && result.length > 0) {
        return StatusMessage(false, 'data is used', department);
      } else {
        const deleteDepartment = await this.departmentRepository.findOne({
          isDeleted: false,
          id: data.id[i],
          companyId: data.companyId
        });
        if (deleteDepartment) {
          stampAudit(deleteDepartment, data, 'update', true);
          return StatusMessage(
            true,
            null,
            await this.departmentRepository.save(deleteDepartment),
          );
        } else {
          return StatusMessage(false, null, department);
        }
      }
    }
    // } catch (e) {
    //   return StatusMessage(false, (e as Error).message, department);
    // }
  }
}
