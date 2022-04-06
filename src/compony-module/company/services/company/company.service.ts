import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompany } from 'src/compony-module/company/dtos/CreateCompany.dto';
import { tbCompany } from 'src/typeorm/tbCompany';
import { stampAudit } from 'src/utils/stamp-audit';
import { Connection, Repository } from 'typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { StatusMessage } from 'src/utils/StatusMessage';
import { getDto } from 'src/typeorm/dtos/getDto.dto';
import { tbCompanyAddress, tbCompanyHoliday, tbCompanyWorkingDay } from 'src/typeorm';
import { EmployeeService } from 'src/employee-module/employee/services/employee/employee.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(tbCompany)
    private readonly companyRepository: Repository<tbCompany>,
    @InjectRepository(tbCompanyAddress)
    private readonly addressRepository: Repository<tbCompanyAddress>,
    @InjectRepository(tbCompanyHoliday)
    private readonly holidayRepository: Repository<tbCompanyHoliday>,
    @InjectRepository(tbCompanyWorkingDay)
    private readonly workingDayRepository: Repository<tbCompanyWorkingDay>,
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: EmployeeService,
    private readonly connection: Connection,
  ) { }

  async getList(params: getDto) {
    //try {
    const company = await this.companyRepository.find({ isDeleted: false });
    company.forEach(
      (data) =>
      (data.image = data.image
        ? Buffer.from(data.image, 'base64').toString('utf8')
        : data.image),
    );
    return company;
  }

  async getById(id: number, companyId: number) {
    try {
      const company = await this.companyRepository.findOne({
        id: id,
      });
      if (company) {
        company.image = company.image
          ? Buffer.from(company.image, 'base64').toString('utf8')
          : null;
      }
      //enum
      const enumType = 'companyType';
      const companyEnum = await this.employeeService.getEnum(enumType);
      //company address
      const companyAddress = await this.addressRepository.findOne({ companyId: id });
      //company holiday
      const companyHoliday = await this.holidayRepository.find({ companyId: id });
      //company working day
      const companyWorkingDay = await this.workingDayRepository.find({ companyId: id });

      return { company, companyEnum, companyAddress, companyHoliday, companyWorkingDay };
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  async getByRegisterId(registerId: number) {
    //try {
    const Organization = await this.companyRepository.find({
      registerId: registerId,
    });
    Organization.forEach(
      (data) =>
      (data.image = data.image
        ? Buffer.from(data.image, 'base64').toString('utf8')
        : data.image),
    );
    return Organization; //StatusMessage(true, null, Organization);
    // } catch (e) {
    //   return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    // }
  }

  async create(createCompany: CreateCompany) {
    //try {
    const Image = createCompany.image;
    createCompany.image = null;
    stampAudit(createCompany, createCompany)
    const newCompany = this.companyRepository.create(createCompany);
    const SaveEmp = await this.companyRepository.save(newCompany);
    if (createCompany.image) {
      const sql =
        'update tbCompany set image = (CAST( ' +
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

  async update(updateCompany: CreateCompany) {
    try {
      // updateOrg.modifiedBy = updateOrg.userId;
      // updateOrg.modifiedDate = new Date();
      // console.log(updateOrg);
      // return await this.orgRepository.update(updateOrg.id, updateOrg);
      const sql =
        'update tbCompany set image = (CAST( ' +
        "'" +
        (updateCompany.image !== undefined
          ? updateCompany.image.toString()
          : null) +
        "'" +
        ' AS varbinary(max))) where id = ' +
        updateCompany.id +
        '';
      const result = await this.connection.query(sql);
      const data = await this.companyRepository.findOne(updateCompany.id);
      data.companyCode = updateCompany.companyCode;
      data.companyName = updateCompany.companyName;
      data.companyNameEn = updateCompany.companyNameEn;
      data.companyType = updateCompany.companyType;
      data.businessType = updateCompany.businessType;
      data.programStartDate = updateCompany.programStartDate;
      data.taxNo = updateCompany.taxNo;
      data.taxBranchNo = updateCompany.taxBranchNo;
      stampAudit(data, updateCompany);
      return await this.companyRepository.save(data); //StatusMessage(true, null, await this.companyRepository.save(data));
    } catch (e) {
      return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    }
  }

  async delete(data: deleteDto) {
    try {
      for (let i = 0; i < data.id.length; i++) {
        const result = await this.connection.query(
          "up_selectAllUse @SearchStr='" + data.id[i] + "',@Column='companyId' ,@companyId='" + data.companyId + "'",
        );
        if (result && result.length > 0) {
          return { message: 'data is used' };
        } else {
          const deleteCompany = await this.companyRepository.findOne(data.id[i]);
          stampAudit(deleteCompany, data, 'update', true);
          return StatusMessage(
            true,
            'Successfully deleted',
            await this.companyRepository.save(deleteCompany),
          );
        }
      }
    } catch (e) {
      return { message: (e as Error).message }; //StatusMessage(false, (e as Error).message, null);
    }
  }
}
