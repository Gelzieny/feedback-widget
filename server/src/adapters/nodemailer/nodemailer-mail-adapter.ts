import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0da1f1ecd8cc06",
    pass: "3ee342e6278b5b"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async send({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Gelzieny Rezende Martins <gelzieny@gmail.com>',
      subject: subject,
      html: body
    });
  }
}