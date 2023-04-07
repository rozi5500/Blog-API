import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as process from 'process';
import { User } from '../../entities';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User, resetLink: string): Promise<void> {
    const appName = 'Core';
    const subject = 'Forgot Password';

    await this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_USER,
      replyTo: `noreply.${process.env.MAIL_USER}`,
      subject,
      template: './forgot-password',
      context: {
        firstName: user.firstName,
        appName,
        resetLink,
      },
    });
  }
}
