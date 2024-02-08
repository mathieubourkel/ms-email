import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { BullModule } from "@nestjs/bull";
import { MailProcessor } from "./mail.processor";
import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get("EMAIL_HOST"),
          port: +configService.get("EMAIL_PORT"),
          secure: true,
          auth: {
            user: configService.get("EMAIL_ADDRESS"),
            pass: configService.get("EMAIL_PASSWORD"),
          },
          tls: { rejectUnauthorized: false },
        },
        defaults: { from: 'Chappy Administrator' }, // the header of the received emails is defined here. Customize this for your application.
        template: {
          dir: __dirname + "/templates", // here you must specify the path where the directory with all email templates is located
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
    BullModule.registerQueue({
      name: "MAIL_QUEUE",
    }),
  ],
  providers: [MailProcessor, MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}