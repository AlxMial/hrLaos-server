import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { tbEmpAddress, tbEmployee } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(tbEmployee)
    private readonly empRepository: Repository<tbEmployee>,
    @InjectRepository(tbEmpAddress)
    private readonly addressRepository: Repository<tbEmpAddress>,
    private readonly connection: Connection,
  ) {}

  async getEmployeeAll() {
    const employee = await this.empRepository.find();
    employee.forEach(
      (data) =>
        (data.image = Buffer.from(data.image, 'base64').toString('utf8')),
    );
    return employee;
  }

  async getEmployeeByCompanyId(companyId: number) {
    const employee = await this.empRepository.find({ companyId: companyId });
    employee.forEach(
      (data) =>
        (data.image = Buffer.from(data.image, 'base64').toString('utf8')),
    );
    return employee;
  }

  async createEmp(createEmp: CreateEmployee) {
    const Image = createEmp.image;
    createEmp.image = null;
    const newEmp = this.empRepository.create(createEmp);
    const SaveEmp = await this.empRepository.save(newEmp);
    const sql =
      'update tbEmployee set image = (CAST( ' +
      "'" +
      Image.toString() +
      "'" +
      ' AS varbinary(max)))  where id = ' +
      SaveEmp.id +
      '';
    const result = await this.connection.query(sql);
    SaveEmp.image = Image;
    return SaveEmp;
  }

  async updateEmp(updateEmp: CreateEmployee) {
    try {
      const sql =
        'update tbEmployee set image = (CAST( ' +
        "'" +
        (updateEmp.image !== undefined ? updateEmp.image.toString() : null) +
        "'" +
        ' AS varbinary(max)))  where id = ' +
        updateEmp.id +
        '';
      const result = await this.connection.query(sql);

      const data = await this.empRepository.findOne(updateEmp.id);
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
      data.modifiedBy = updateEmp.userId;
      data.modifiedDate = new Date();
      return await this.empRepository.save(data);
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  async deleteEmp(data: deleteDto) {
    try {
      const result = await this.connection.query(
        "up_selectAllUse @SearchStr='" + data.id + "',@Column='empId'",
      );
      if (result) {
        return { message: 'data is used' };
      } else {
        const deleteEmp = await this.empRepository.findOne(data.id);
        deleteEmp.isDeleted = true;
        deleteEmp.modifiedBy = data.userId;
        deleteEmp.modifiedDate = new Date();
        return await this.empRepository.save(deleteEmp);
      }
    } catch (e) {
      return { message: (e as Error).message };
    }
  }
}
