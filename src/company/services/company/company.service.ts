import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompany } from 'src/company/dtos/CreateCompany.dto';
import { tbCompany } from 'src/typeorm/tbCompany';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(tbCompany)
    private readonly companyRepository: Repository<tbCompany>,
    private readonly connection: Connection,
  ) {}

  getOrgAll() {
    const Organization = this.companyRepository.find();
    return Organization;
  }

  getCompanyByRegisterId(registerId: number) {
    const Organization = this.companyRepository.findOne({
      registerId: registerId,
    });
    return Organization;
  }

  createCompany(createCompany: CreateCompany) {
    const newCompany = this.companyRepository.create(createCompany);
    return this.companyRepository.save(newCompany);
  }

  async updateCompany(updateCompany: CreateCompany) {
    try {
      // updateOrg.modifiedBy = updateOrg.userId;
      // updateOrg.modifiedDate = new Date();
      // console.log(updateOrg);
      // return await this.orgRepository.update(updateOrg.id, updateOrg);
      const data = await this.companyRepository.findOne(updateCompany.id);
      data.companyCode = updateCompany.companyCode;
      data.companyName = updateCompany.companyName;
      data.companyNameEn = updateCompany.companyNameEn;
      data.companyType = updateCompany.companyType;
      data.businessType = updateCompany.businessType;
      data.programStartDate = updateCompany.programStartDate;
      data.image = updateCompany.image;
      data.taxNo = updateCompany.taxNo;
      data.taxBranchNo = updateCompany.taxBranchNo;
      data.modifiedBy = updateCompany.userId;
      data.modifiedDate = new Date();
      return await this.companyRepository.save(data);
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  async deleteCompany(data: any) {
    try {
      const result = await this.connection.query(
        "up_selectAllUse @SearchStr='" + data.id + "',@Column='companyId'",
      );
      if (result) {
        return { message: 'data is used' };
      } else {
        const deleteCompany = await this.companyRepository.findOne(data.id);
        deleteCompany.isDeleted = true;
        deleteCompany.modifiedBy = data.userId;
        deleteCompany.modifiedDate = new Date();
        // this.userRepository.delete(id);
        return await this.companyRepository.save(deleteCompany);
      }
    } catch (e) {
      return { message: (e as Error).message };
    }
  }
}
