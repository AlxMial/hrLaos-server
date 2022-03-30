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
    employee.image = employee.image
      ? Buffer.from(employee.image, 'base64').toString('utf8')
      : null;
    const empAddress = await this.addressRepository.find({ empId: empId });
    return { employee, empAddress };
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
    if (createEmp.empAddress !== undefined && SaveEmp) {
      createEmp.empAddress.forEach(async (data: CreateEmpAddress) => {
        data.empId = SaveEmp.id;
        data.isDeleted = false;
        data.modifiedDate = new Date();
      });
      // createEmp.empAddress.empId = SaveEmp.id;
      // createEmp.empAddress.isDeleted = false;
      const empAddress = await this.addressRepository.save(
        createEmp.empAddress,
      );
      SaveEmp['empAddress'] = empAddress;
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

    updateEmp.empAddress.forEach(async (data: CreateEmpAddress) => {
      const dataAddress = await this.addressRepository.findOne({
        empId: updateEmp.id,
        addressType: data.addressType,
      });
      if (dataAddress === undefined && data) {
        data.empId = updateEmp.id;
        data.isDeleted = false;
        await this.addressRepository.save(data);
      } else if (dataAddress && data) {
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
        dataAddress.modifiedBy = updateEmp.userId;
        dataAddress.modifiedDate = new Date();
        dataAddress.isDeleted = false;
      }
      await this.addressRepository.save(dataAddress);
    });

    return await this.empRepository.save(data);
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
        "',@Column='empId', @exceptTable='tbEmpAddress'",
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
