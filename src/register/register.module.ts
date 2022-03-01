import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import { tbRegister } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([tbRegister]), MailModule],
  controllers: [RegisterController],
  providers: [
    {
      provide: 'REGISTER_SERVICE',
      useClass: RegisterService,
    },
  ],
})
export class RegisterModule {}
