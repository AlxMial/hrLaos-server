import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbRegister, tbUser, tbOrganization } from '../../../typeorm';
import { Repository } from 'typeorm';
import { Register } from '../../types';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { MailService } from '../../../mail/services/mail/mail.service';
import { EncryptService } from 'src/utils/crypto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(tbRegister)
    private readonly registerRepository: Repository<tbRegister>,
    private mailService: MailService,
    private encryptService: EncryptService,
  ) {}

  private register: Register[] = [];

  findRegisterByID(id: any) {
    return this.registerRepository.findOne(id);
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
}
