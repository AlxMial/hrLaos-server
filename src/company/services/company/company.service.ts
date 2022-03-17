import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompany } from 'src/company/dtos/CreateCompany.dto';
import { tbCompany } from 'src/typeorm/tbCompany';
import { StatusMessage } from 'src/utils/StatusMessage';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(tbCompany)
    private readonly companyRepository: Repository<tbCompany>,
    private readonly connection: Connection,
  ) {}

  async getOrgAll() {
    try {
      const Organization = await this.companyRepository.find();
      Organization.forEach(
        (data) =>
          (data.image = Buffer.from(data.image, 'base64').toString('utf8')),
      );
      return StatusMessage(true, null, Organization);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, null);
    }
  }

  async getCompanyByRegisterId(registerId: number) {
    try {
      const Organization = await this.companyRepository.find({
        registerId: registerId,
      });
      Organization.forEach(
        (data) =>
          (data.image = data.image
            ? Buffer.from(data.image, 'base64').toString('utf8')
            : data.image),
      );
      return StatusMessage(true, null, Organization);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, null);
    }
  }

  async createCompany(createCompany: CreateCompany) {
    try {
      const Image = createCompany.image;
      createCompany.image = null;
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
      return StatusMessage(true, null, SaveEmp);
    } catch (e) {
      return StatusMessage(false, (e as Error).message, null);
    }
  }

  async updateCompany(updateCompany: CreateCompany) {
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
      data.modifiedBy = updateCompany.userId;
      data.modifiedDate = new Date();
      return StatusMessage(true, null, await this.companyRepository.save(data));
    } catch (e) {
      return StatusMessage(false, (e as Error).message, null);
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
        return StatusMessage(
          true,
          null,
          await this.companyRepository.save(deleteCompany),
        );
      }
    } catch (e) {
      return StatusMessage(false, (e as Error).message, null);
    }
  }
}
