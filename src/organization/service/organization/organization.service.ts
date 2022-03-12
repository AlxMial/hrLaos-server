import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { CreateOrg } from 'src/organization/dtos/CreateOrg.dto';
import { CreateOrgAddress } from 'src/organization/dtos/CreateOrgAddress.dto';
import { Repository } from 'typeorm';
import { tbOrg, tbOrgAddress } from '../../../typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(tbOrg)
    private readonly orgRepository: Repository<tbOrg>,
    @InjectRepository(tbOrgAddress)
    private readonly addressRepository: Repository<tbOrgAddress>,
  ) {}

  getOrgAll() {
    const Organization = this.orgRepository.find();
    return Organization;
  }

  getOrgByCompanyId(companyId: number) {
    const Organization = this.orgRepository.findOne({ companyId: companyId });
    return Organization;
  }

  createOrg(createOrg: CreateOrg) {
    const newOrg = this.orgRepository.create(createOrg);
    return this.orgRepository.save(newOrg);
  }

  async updateOrg(updateOrg: CreateOrg) {
    try {
      // updateOrg.modifiedBy = updateOrg.userId;
      // updateOrg.modifiedDate = new Date();
      // console.log(updateOrg);
      // return await this.orgRepository.update(updateOrg.id, updateOrg);
      const data = await this.orgRepository.findOne(updateOrg.id);
      data.orgCode = updateOrg.orgCode;
      data.orgName = updateOrg.orgName;
      data.orgNameEng = updateOrg.orgNameEng;
      data.orgType = updateOrg.orgType;
      data.businessType = updateOrg.businessType;
      data.beginProgram = updateOrg.beginProgram;
      data.image = updateOrg.image;
      data.taxNo = updateOrg.taxNo;
      data.taxBranchNo = updateOrg.taxBranchNo;
      data.isFiscalYear = updateOrg.isFiscalYear;
      data.isCalLeaveFiscalYear = updateOrg.isCalLeaveFiscalYear;
      data.dateStartYear = updateOrg.dateStartYear;
      data.monthStartYear = updateOrg.monthStartYear;
      data.yearCount = updateOrg.yearCount;
      data.hourPerDay = updateOrg.hourPerDay;
      data.dayPerMonth = updateOrg.dayPerMonth;
      data.modifiedBy = updateOrg.userId;
      data.modifiedDate = new Date();
      return await this.orgRepository.save(data);
    } catch (e) {
      return { message: (e as Error).message };
    }
  }

  async deleteOrg(data: any) {
    try {
      const updateUser = await this.orgRepository.findOne(data.id);
      updateUser.isDeleted = true;
      updateUser.modifiedBy = data.userId;
      updateUser.modifiedDate = new Date();
      // this.userRepository.delete(id);
      return await this.orgRepository.save(updateUser);
    } catch (e) {
      return { message: (e as Error).message };
    }
  }
}
