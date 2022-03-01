import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbRegister as Entity, tbRegister } from '../../../typeorm';
import { Repository } from 'typeorm';
import { SerializedRegister, Register } from '../../types';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { MailService } from '../../../mail/services/mail/mail.service';
import { encryptStr, decryptStr } from 'src/utils/crypto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Entity)
    private readonly registerRepository: Repository<Entity>,
    private mailService: MailService,
  ) {}

  private register: Register[] = [];

  async createUser(createRegisterDto: CreateRegisterDto) {
    const Password = encodePassword(createRegisterDto.Password);

    const newRegister = this.registerRepository.create({
      ...createRegisterDto,
      Password,
    });
    const success = await this.registerRepository
      .save(newRegister)
      .then((e) => {
        const token = encryptStr(e.RegisterID);
        this.mailService.sendUserConfirmation(e, token);
      });
    return success;
  }
}
