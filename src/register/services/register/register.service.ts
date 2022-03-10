import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbRegister, tbUser, tbOrg } from '../../../typeorm';
import { Repository } from 'typeorm';
import { Register } from '../../types';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { MailService } from '../../../mail/services/mail/mail.service';
import { EncryptService } from 'src/utils/crypto';
import { CreateOrg } from 'src/organization/dtos/CreateOrg.dto';
import { OrganizationService } from 'src/organization/service/organization/organization.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(tbRegister)
    private readonly registerRepository: Repository<tbRegister>,
    private mailService: MailService,
    private encryptService: EncryptService,
    @Inject('ORGANIZATION_SERVICE')
    private readonly organizationService: OrganizationService,
  ) {}

  private register: Register[] = [];

  findRegisterByID(id: any) {
    return this.registerRepository.findOne({ RegisterID: id });
  }

  async activeRegister(Register: any) {
    console.log(Register);
  }

  async createUser(createRegisterDto: CreateRegisterDto) {
    const Password = encodePassword(createRegisterDto.Password);

    const newRegister = this.registerRepository.create({
      ...createRegisterDto,
      Password,
    });
    await this.registerRepository.save(newRegister).then((e) => {
      const token = this.encryptService.EncodeKey(e.RegisterID);
      this.mailService.sendUserConfirmation(e, token);
      console.log(token);
    });
    return newRegister;
  }

  async activateRegister(data: any) {
    const createOrg = new CreateOrg();
    createOrg.CompanyID = data.RegisterID;
    createOrg.IsCalFiscalYear = false;
    createOrg.IsDeleted = false;
    createOrg.IsFiscalYear = false;
    createOrg.IsCalLeaveFiscalYear = false;
    createOrg.OrgName = data.CompanyName;
    createOrg.OrgType = 'HeadOffice';
    const org = await this.organizationService.createOrg(createOrg);
    return org;
  }
}
