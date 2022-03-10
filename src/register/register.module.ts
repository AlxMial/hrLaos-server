import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import { tbOrg, tbOrgAddress, tbRegister } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { EncryptService } from 'src/utils/crypto';
import { OrganizationService } from 'src/organization/service/organization/organization.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([tbRegister, tbOrg, tbOrgAddress]),
    MailModule,
  ],
  controllers: [RegisterController],
  providers: [
    {
      provide: 'REGISTER_SERVICE',
      useClass: RegisterService,
    },
    {
      provide: 'ORGANIZATION_SERVICE',
      useClass: OrganizationService,
    },
    EncryptService,
  ],
})
export class RegisterModule {}
