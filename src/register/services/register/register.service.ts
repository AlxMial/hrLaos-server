import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tbRegister as Entity } from '../../../typeorm';
import { Repository } from 'typeorm';
import { SerializedRegister, Register } from '../../types';
import { CreateRegisterDto } from 'src/register/dtos/CreateRegister.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Entity)
    private readonly registerRepository: Repository<Entity>,
  ) {}

  private register: Register[] = [];

  createUser(createRegisterDto: CreateRegisterDto) {
    const Password = encodePassword(createRegisterDto.Password);
    const newRegister = this.registerRepository.create({
      ...createRegisterDto,
      Password,
    });
    return this.registerRepository.save(newRegister);
  }
}
