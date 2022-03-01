import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbRegister as Entity } from '../../../typeorm';
import { Repository } from 'typeorm';
import { SerializedRegister, Register } from '../../types';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { MailService } from '../../../mail/services/mail/mail.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Entity)
    private readonly registerRepository: Repository<Entity>,
    private mailService: MailService,
  ) {}

  private register: Register[] = [];

  createUser(createRegisterDto: CreateRegisterDto) {
    const Password = encodePassword(createRegisterDto.Password);
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const newRegister = this.registerRepository.create({
      ...createRegisterDto,
      Password,
    });
    const success = this.registerRepository.save(newRegister);
    if (success) this.mailService.sendUserConfirmation(newRegister, token);
    return success;
  }
}
