import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmpAddress } from 'src/employee/dtos/CreateEmpAddress.dto';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { tbEmpAddress, tbEmployee } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { StatusMessage } from 'src/utils/StatusMessage';
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
    try {
      const employee = await this.empRepository.find();
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

  async getEmployeeByEmpId(empId: number) {
    //try {
    const employee = await this.empRepository.findOne({ id: empId });
    employee.image = employee.image
      ? Buffer.from(employee.image, 'base64').toString('utf8')
      : null;
    return employee;
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
    const newEmp = this.empRepository.create(createEmp);
    const SaveEmp = await this.empRepository.save(newEmp);
    // if (createEmp.empAddress !== undefined && SaveEmp) {
    //   createEmp.empAddress.empId = SaveEmp.id;
    //   createEmp.empAddress.isDeleted = false;
    //   const empAddress = await this.addressRepository.save(
    //     createEmp.empAddress,
    //   );
    //   SaveEmp['empAddress'] = empAddress;
    // }
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

  async updateEmp(updateEmp: CreateEmployee) {
    //try {
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

    // const dataAddress = await this.addressRepository.findOne({
    //   empId: updateEmp.id,
    // });
    // if (dataAddress === undefined && updateEmp.empAddress) {
    //   updateEmp.empAddress.empId = updateEmp.id;
    //   updateEmp.empAddress.isDeleted = false;
    //   await this.addressRepository.save(updateEmp.empAddress);
    // } else if (dataAddress && updateEmp.empAddress) {
    //   dataAddress.addressDetail = updateEmp.empAddress.addressDetail;
    //   dataAddress.addressType = updateEmp.empAddress.addressType;
    //   dataAddress.country = updateEmp.empAddress.country;
    //   dataAddress.postalCode = updateEmp.empAddress.postalCode;
    //   dataAddress.province = updateEmp.empAddress.province;
    //   dataAddress.district = updateEmp.empAddress.district;
    //   dataAddress.subDistrict = updateEmp.empAddress.subDistrict;
    //   dataAddress.latitude = updateEmp.empAddress.latitude;
    //   dataAddress.longitude = updateEmp.empAddress.longitude;
    //   dataAddress.email = updateEmp.empAddress.email;
    //   dataAddress.phone = updateEmp.empAddress.phone;
    //   dataAddress.modifiedBy = updateEmp.userId;
    //   dataAddress.modifiedDate = new Date();
    //   dataAddress.isDeleted = false;
    // }
    // await this.addressRepository.save(dataAddress);
    return await this.empRepository.save(data);
    // } catch (e) {
    //   return { message: (e as Error).message };
    // }
  }

  async deleteEmp(data: any) {
    //try {
    data.id.forEach(async (value: any) => {
      const result = await this.connection.query(
        "up_selectAllUse @SearchStr='" + value + "',@Column='empId'",
      );
      if (result) {
        return { message: 'data is used' };
      } else {
        const deleteEmp = await this.empRepository.findOne(value);
        deleteEmp.isDeleted = true;
        deleteEmp.modifiedBy = parseInt(data.userId);
        deleteEmp.modifiedDate = new Date();
        await this.empRepository.save(deleteEmp);
      }
    });
  }
}
