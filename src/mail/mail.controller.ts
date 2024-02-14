import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, InternalServerErrorException } from '@nestjs/common';
import { MailService } from './mail.service';
import { BaseUtils } from 'libs/base/base.utils';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('mail')
export class MailController extends BaseUtils {
  constructor(private readonly mailService: MailService) {
    super()
  }

  @MessagePattern("SEND_MAIL")
  sendMail(@Payload() body: any) {
    try {
      return this.mailService.sendConfirmationEmail(body.emailAddress, body.confirmUrl);
    } catch (error) {
      this._catchEx(error)
    }
  }
}
