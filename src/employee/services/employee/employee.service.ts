import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmpAddress } from 'src/employee/dtos/CreateEmpAddress.dto';
import { CreateEmpEmployment } from 'src/employee/dtos/CreateEmpEmployment.dto';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { tbEmpAddress, tbEmployee, tbPosition, tbDepartment, tbEmpEmployment } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { getDto } from 'src/typeorm/dtos/getDto.dto';
import { stampAudit } from 'src/utils/stamp-audit';
import { StatusMessage } from 'src/utils/StatusMessage';
import { Repository, Connection, Not } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(tbEmployee)
    private readonly empRepository: Repository<tbEmployee>,
    @InjectRepository(tbEmpAddress)
    private readonly addressRepository: Repository<tbEmpAddress>,
    @InjectRepository(tbEmpEmployment)
    private readonly employmentRepository: Repository<tbEmpEmployment>,
    @InjectRepository(tbPosition)
    private readonly positionRepository: Repository<tbPosition>,
    @InjectRepository(tbDepartment)
    private readonly departmentRepository: Repository<tbDepartment>,
    private readonly connection: Connection,
  ) { }

  async getEmployeeAll(params: getDto) {
    try {
      const employee = await this.empRepository.find({ isDeleted: false, companyId: params.companyId });
      employee.forEach(
        (data) =>
        (data.image = data.image
          ? Buffer.from(data.image, 'base64').toString('utf8')
          : data.image),
      );
      return employee;
    } catch (e) {
      return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    }
  }

  async getEmployeeByEmpId(empId: number, companyId: number) {
    //try {
    const employee = await this.empRepository.findOne({
      id: empId,
      companyId: companyId,
    });
    if (employee) {
      employee.image = employee.image
        ? Buffer.from(employee.image, 'base64').toString('utf8')
        : null;
    }
    // Emp Address
    const empAddress = await this.addressRepository.find({ empId: empId, companyId: companyId });
    // Emp Employment
    const empEmployment = await this.employmentRepository.find({ empId: empId, companyId: companyId });
    //enum
    const empEnum = [];
    //position
    const position = await this.positionRepository.find({ isDeleted: false, companyId: companyId });
    //department
    const department = await this.departmentRepository.find({ isDeleted: false, companyId: companyId });
    // supervisor
    const supervisor = await this.empRepository.find({
      where: {
        id: Not(empId),
        companyId: companyId,
        isDeleted: false,
      },
      select: [
        'id',
        'empCode',
        'title',
        'titleEn',
        'lastName',
        'firstName',
        'nickName',
        'firstNameEn',
        'lastNameEn',
        'nickNameEn',
      ],
    });

    return {
      employee,
      empAddress,
      position,
      supervisor,
      department,
      empEnum,
      empEmployment
    };
    // } catch (e) {
    //   return { message: (e as Error).message };
    // }
  }

  async getEmployeeByCompanyId(companyId: number) {
    try {
      const employee = await this.empRepository.find({ companyId: companyId });
      employee.forEach(
        (data) =>
        (data.image = data.image
          ? Buffer.from(data.image, 'base64').toString('utf8')
          : data.image),
      );
      return employee; //StatusMessage(true, null, employee);
    } catch (e) {
      return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    }
  }

  async createEmp(createEmp: CreateEmployee) {
    //try {
    const Image = createEmp.image;
    createEmp.image = null;
    stampAudit(createEmp);
    const newEmp = this.empRepository.create(createEmp);
    const SaveEmp = await this.empRepository.save(newEmp);

    //Address
    if (createEmp.empAddress !== undefined && SaveEmp) {
      await this.setAddress(createEmp, SaveEmp);
    }

    //Employment
    if (createEmp.empEmployment !== undefined && SaveEmp) {
      await this.setEmployment(createEmp, SaveEmp);
    }

    if (Image) {
      const sql =
        'update tbEmployee set image = (CAST( ' +
        "'" +
        Image.toString() +
        "'" +
        ' AS varbinary(max)))  where id = ' +
        SaveEmp.id +
        '';
      const result = await this.connection.query(sql);
    }
    SaveEmp.image = Image;
    return SaveEmp; //StatusMessage(true, null, SaveEmp);
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }

  async setAddress(createEmp: CreateEmployee, SaveEmp: tbEmployee) {
    createEmp.empAddress.forEach(async (data: CreateEmpAddress) => {
      data.empId = SaveEmp.id;
      data.companyId = SaveEmp.companyId;
      const dataAddress = await this.addressRepository.findOne({
        empId: SaveEmp.id,
        addressType: data.addressType,
      });

      if (dataAddress === undefined && data) {
        stampAudit(data, SaveEmp);
        return await this.addressRepository.save(data);
      } else {
        dataAddress.addressDetail = data.addressDetail;
        dataAddress.addressType = data.addressType;
        dataAddress.country = data.country;
        dataAddress.postalCode = data.postalCode;
        dataAddress.province = data.province;
        dataAddress.district = data.district;
        dataAddress.subDistrict = data.subDistrict;
        dataAddress.latitude = data.latitude;
        dataAddress.longitude = data.longitude;
        dataAddress.email = data.email;
        dataAddress.phone = data.phone;
        stampAudit(dataAddress, SaveEmp, 'update');
        return await this.addressRepository.save(dataAddress);
      }
    });
    // const empAddress = await this.addressRepository.save(
    //   createEmp.empAddress,
    // );
    // SaveEmp['empAddress'] = empAddress;
  }

  // set employment
  async setEmployment(createEmp: CreateEmployee, SaveEmp: tbEmployee) {
    createEmp.empEmployment.forEach(async (data: CreateEmpEmployment) => {
      data.empId = SaveEmp.id;
      data.companyId = SaveEmp.companyId;
      if (!data.departmentId) {
        //Add New Department
        const newDepartment = this.departmentRepository.create({
          departmentCode: data.departmentInput,
          departmentName: data.departmentInput,
          departmentNameEn: data.departmentInput,
          companyId: createEmp.companyId,
        });
        stampAudit(newDepartment, createEmp);
        const SaveDepartment = await this.departmentRepository.save(newDepartment);
        data.departmentId = SaveDepartment.id;
      }
      if (!data.positionId) {
        //Add New Position
        const newPosition = this.positionRepository.create({
          positionCode: data.positionInput,
          positionName: data.positionInput,
          positionNameEn: data.positionInput,
          companyId: createEmp.companyId,
        });
        stampAudit(newPosition, createEmp);
        const SavePosition = await this.positionRepository.save(newPosition);
        data.positionId = SavePosition.id;
      }

      const dataEmployment = await this.employmentRepository.findOne({
        empId: SaveEmp.id,
        companyId: SaveEmp.companyId,
      });
      if (dataEmployment === undefined && data) {
        // New case
        stampAudit(data, SaveEmp);
        return await this.employmentRepository.save(data);
      } else {
        dataEmployment.startWorkingDate = data.startWorkingDate;
        dataEmployment.empId = SaveEmp.id;
        dataEmployment.departmentId = data.departmentId;
        dataEmployment.positionId = data.positionId;
        dataEmployment.supervisorId = data.supervisorId;
        dataEmployment.shiftId = data.shiftId;
        dataEmployment.empType = data.empType;
        dataEmployment.workingStatus = data.workingStatus;
        dataEmployment.locationId = data.locationId;
        stampAudit(dataEmployment, SaveEmp, 'update');
        return await this.employmentRepository.save(dataEmployment);
      }
    });

    // Save Employment
    // const empEmployment = await this.addressRepository.save(
    //   createEmp.empEmployment,
    // );
    // SaveEmp['empEmployment'] = empEmployment;
  }

  async updateEmp(updateEmp: CreateEmployee) {
    //try {
    const sql =
      'update tbEmployee set image = (CAST( ' +
      "'" +
      (updateEmp.image ? updateEmp.image.toString() : null) +
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
    stampAudit(data, updateEmp, 'update');
    const employee = await this.empRepository.save(data);
    //Address
    await this.setAddress(updateEmp, employee);
    //Employment
    await this.setEmployment(updateEmp, employee);

    return employee;
    // } catch (e) {
    //   return { message: (e as Error).message };
    // }
  }

  async CheckEmp(data: deleteDto) {
    const message = this.empRepository;
    for (let i = 0; i < data.id.length; i++) {
      const result = await this.connection.query(
        "up_selectAllUse @SearchStr='" +
        data.id[i] +
        "',@Column='empId', @exceptTable='tbEmpAddress,tbEmpEmployment', @companyId='" + data.companyId + "'",
      );
      if (result && result.length > 0) {
        return StatusMessage(
          false,
          'Data is used',
          message,
        );
      } else {
        await this.deleteEmpAddress(data.id[i], data);
        await this.deleteEmployment(data.id[i], data);
        return StatusMessage(
          true,
          'Sucessfully',
          await this.deleteEmp(data.id[i], data),
        );
      }
    }
    return message;
  }

  async deleteEmpAddress(empId: any, dataDelete: any) {
    const deleteAddress = await this.addressRepository.findOne({ empId: empId, companyId: dataDelete.companyId });
    if (deleteAddress) {
      stampAudit(deleteAddress, dataDelete, 'update', true);
      const success = await this.addressRepository.save(deleteAddress);
      return success;
    }
    return this.empRepository;
  }

  async deleteEmployment(empId: any, dataDelete: any) {
    const deleteEmployment = await this.employmentRepository.findOne({ empId: empId, companyId: dataDelete.companyId });
    if (deleteEmployment) {
      stampAudit(deleteEmployment, dataDelete, 'update', true);
      const success = await this.employmentRepository.save(deleteEmployment);
      return success;
    }
    return this.empRepository;
  }


  async deleteEmp(empId: any, dataDelete: any) {
    const deleteEmp = await this.empRepository.findOne({ id: empId, companyId: dataDelete.companyId });
    if (deleteEmp) {
      stampAudit(deleteEmp, dataDelete, 'update', true);
      const success = await this.empRepository.save(deleteEmp);
      return success;
    }
    return this.empRepository;
  }
}
