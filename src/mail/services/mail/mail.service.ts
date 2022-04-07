import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { tbRegister as Entity } from '../../../typeorm';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(register: Entity, token: string) {
    const url = `http://localhost:3000/confirmregister/${token}`;

    await this.mailerService.sendMail({
      to: register.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'HR Laos Confirmation Register',
      template: '../../templates/confirmation', // `.hbs` extension is appended automatically
      context: {
        name: register.firstName + ' ' + register.lastName,
        url,
      },
    });
  }
}
