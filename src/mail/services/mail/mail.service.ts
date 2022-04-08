import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { tbRegister as Entity, tbUser } from '../../../typeorm';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(clientUrl: string, register: Entity, token: string) {
    // const url = `http://localhost:3000/confirmregister/${token}`;
    const url = `${clientUrl}/confirmregister/${token}`;

    await this.mailerService.sendMail({
      to: register.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'HR Confirmation Register',
      template: '../../templates/confirmation', // `.hbs` extension is appended automatically
      context: {
        name: register.firstName + ' ' + register.lastName,
        url,
      },
    });
  }

  async sendForgotPassword(clientUrl: string, user: tbUser, token: string) {
    // const url = `http://localhost:3000/resetPassword/${token}`;
    const url = `${clientUrl}/forgotpassword/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'HR Reset password',
      template: '../../templates/forgotPassword', // `.hbs` extension is appended automatically
      context: {
        name: user.userName,
        url,
      },
    });
  }
}
