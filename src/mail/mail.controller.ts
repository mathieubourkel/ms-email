import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, InternalServerErrorException } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  sendMail(@Body() body: any) {
    try {
      return this.mailService.sendConfirmationEmail(body.emailAddress, body.confirmUrl);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}
