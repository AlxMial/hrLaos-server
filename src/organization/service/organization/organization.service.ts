import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  createOrg(createOrg: CreateOrg) {
    const newUser = this.orgRepository.create(createOrg);
    return this.orgRepository.save(newUser);
  }
}
