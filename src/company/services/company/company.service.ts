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

  async getOrgAll() {
    const Organization = await this.companyRepository.find();
    Organization.forEach(
      (data) =>
        (data.image = Buffer.from(data.image, 'base64').toString('utf8')),
    );
    return Organization;
  }

  async getCompanyByRegisterId(registerId: number) {
    const Organization = await this.companyRepository.find({
      registerId: registerId,
    });
    Organization.forEach(
      (data) =>
        (data.image = Buffer.from(data.image, 'base64').toString('utf8')),
    );
    return Organization;
  }

  async createCompany(createCompany: CreateCompany) {
    const Image = createCompany.image;
    createCompany.image = null;
    const newCompany = this.companyRepository.create(createCompany);
    const SaveEmp = await this.companyRepository.save(newCompany);

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

  async updateCompany(updateCompany: CreateCompany) {
    try {
      // updateOrg.modifiedBy = updateOrg.userId;
      // updateOrg.modifiedDate = new Date();
      // console.log(updateOrg);
      // return await this.orgRepository.update(updateOrg.id, updateOrg);
      const sql =
        'update tbEmployee set image = (CAST( ' +
        "'" +
        updateCompany.image +
        "'" +
        ' AS varbinary(max)))  where id = ' +
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
