import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmpAddress } from 'src/employee/dtos/CreateEmpAddress.dto';
import { CreateEmpEmployment } from 'src/employee/dtos/CreateEmpEmployment.dto';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { tbEmpAddress, tbEmployee, tbPosition, tbDepartment, tbEmpEmployment } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
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

  async getEmployeeAll() {
    try {
      const employee = await this.empRepository.find({ isDeleted: false });
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
    //Emp Address
    const empAddress = await this.addressRepository.find({ empId: empId });
    // Emp Employment
    const empEmployment = await this.employmentRepository.find({ empId: empId });
    //enum
    const empEnum = [];
    //position
    const position = await this.positionRepository.find({ isDeleted: false });
    //department
    const department = await this.departmentRepository.find({ isDeleted: false });
    //supervisor
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

    return { employee, empAddress, position, supervisor, department, empEnum, empEmployment };
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
    createEmp.createdBy = createEmp.userId;
    createEmp.createdDate = new Date();
    createEmp.modifiedBy = createEmp.userId;
    createEmp.modifiedDate = new Date();
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
      data.isDeleted = false;
      data.modifiedDate = new Date();
      data.modifiedBy = SaveEmp.modifiedBy;
      const dataAddress = await this.addressRepository.findOne({
        empId: SaveEmp.id,
        addressType: data.addressType,
      });

      if (dataAddress === undefined && data) {
        data.createdBy = SaveEmp.createdBy;
        data.createdDate = new Date();
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
        dataAddress.modifiedBy = SaveEmp.modifiedBy;
        dataAddress.modifiedDate = new Date();
        dataAddress.isDeleted = false;
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
      data.isDeleted = false;
      data.modifiedDate = new Date();
      data.modifiedBy = SaveEmp.modifiedBy;
      data.companyId = SaveEmp.companyId;
      if (!data.departmentId) {
        //Add New Department
        const newDepartment = this.departmentRepository.create({
          departmentCode: data.departmentInput,
          departmentName: data.departmentInput,
          departmentNameEn: data.departmentInput,
          isDeleted: false,
          companyId: createEmp.companyId,
          createdDate: new Date(),
          modifiedDate: new Date(),
          createdBy: createEmp.userId,
          modifiedBy: createEmp.userId,
        });
        const SaveDepartment = await this.departmentRepository.save(newDepartment);
        data.departmentId = SaveDepartment.id;
      }
      if (!data.positionId) {
        //Add New Position
        const newPosition = this.positionRepository.create({
          positionCode: data.positionInput,
          positionName: data.positionInput,
          positionNameEn: data.positionInput,
          isDeleted: false,
          companyId: createEmp.companyId,
          createdDate: new Date(),
          modifiedDate: new Date(),
          createdBy: createEmp.userId,
          modifiedBy: createEmp.userId,
        });
        const SavePosition = await this.positionRepository.save(newPosition);
        data.positionId = SavePosition.id;
      }

      const dataEmployment = await this.employmentRepository.findOne({
        empId: SaveEmp.id,
        companyId: SaveEmp.companyId,
      });
      if (dataEmployment === undefined && data) {
        // New case
        data.createdBy = SaveEmp.createdBy;
        data.createdDate = new Date();
        return await this.employmentRepository.save(data);
      } else {
        dataEmployment.startWorkingDate = data.startWorkingDate;
        dataEmployment.empId = SaveEmp.id;
        dataEmployment.departmentId = data.departmentId;
        dataEmployment.positionId = data.positionId;
        dataEmployment.modifiedBy = SaveEmp.modifiedBy;
        dataEmployment.modifiedDate = new Date();
        dataEmployment.isDeleted = false;
        dataEmployment.supervisorId = data.supervisorId;
        dataEmployment.shiftId = data.shiftId;
        dataEmployment.empType = data.empType;
        dataEmployment.workingStatus = data.workingStatus;
        dataEmployment.locationId = data.locationId;
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
    data.modifiedBy = updateEmp.userId;
    data.modifiedDate = new Date();
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

  async CheckEmp(data: any) {
    const message = new deleteDto();
    // const val = await data.id.forEach(async (value: any) => {
    //   const result = await this.connection.query(
    //     "up_selectAllUse @SearchStr='" + value + "',@Column='empId'",
    //   );
    //   if (result) {
    //     message['message'] = 'data is used';
    //     message['isResult'] = false;
    //   } else {
    //     this.deleteEmp(value, data.userId);
    //     message['message'] = 'Sucessfully';
    //     message['isResult'] = true;
    //   }
    // });

    for (let i = 0; i < data.id.length; i++) {
      this.deleteEmpAddress(data.id[i], data.userId);
      const result = await this.connection.query(
        "up_selectAllUse @SearchStr='" +
        data.id[i] +
        "',@Column='empId', @exceptTable='tbEmpAddress,tbEmpEmployment'",
      );
      if (result && result.length > 0) {
        message['message'] = 'data is used';
        message['isResult'] = false;
        break;
      } else {
        this.deleteEmp(data.id[i], data.userId);
        message['message'] = 'Sucessfully';
        message['isResult'] = true;
      }
    }
    return message;
  }

  async deleteEmpAddress(data: any, userId: any) {
    const deleteAddress = await this.addressRepository.findOne({ empId: data });
    deleteAddress.isDeleted = true;
    deleteAddress.modifiedBy = parseInt(userId);
    deleteAddress.modifiedDate = new Date();
    const success = await this.addressRepository.save(deleteAddress);
    return success ? true : false;
  }

  async deleteEmp(data: any, userId: any) {
    const deleteEmp = await this.empRepository.findOne({ id: data });
    deleteEmp.isDeleted = true;
    deleteEmp.modifiedBy = parseInt(userId);
    deleteEmp.modifiedDate = new Date();
    const success = await this.empRepository.save(deleteEmp);
    return success ? true : false;
  }
}
