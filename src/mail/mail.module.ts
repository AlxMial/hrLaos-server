import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './services/mail/mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { tbRegister } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global() // 👈 optional to make module global
@Module({
  imports: [
    TypeOrmModule.forFeature([tbRegister]),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: 'weatherblocker@gmail.com',
            pass: 'asujimuser181233',
          },
        },
        defaults: {
          from: `"HR Laos Confirmation Register"`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
