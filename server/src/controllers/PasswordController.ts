import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { createTransport, SendMailOptions } from 'nodemailer';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

declare const process: {
  env: {
    FORGOT_PASSWORD: string;
    BASE_URL_FRONTEND: string;
  }
}

const shippingEmail = createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c5878c49bd0aa0",
    pass: "023fd69808f13b"
  }
});

export default {

  async update(request: Request, response: Response) {
    const { email } = request.body;

    const data = {
      email
    }
    
    const schema = Yup.object().shape({
      email: Yup.string().email().required()
    });
    
    await schema.validate(data, {
      abortEarly: false
    });

    const users = getRepository(User);
    const user = await users.findOne({ where: { email } });

    if (user) {
      const token = sign({ id: user.id }, process.env.FORGOT_PASSWORD, { expiresIn: 900 });

      const receivingEmail: SendMailOptions = {
        from: 'bot@happy.com',
        to: email,
        subject: 'Primeiro email com nodemailer',
        html: `
          <h1>Happy</h1>
          <p>
            Você esqueceu sua senha da conta happy? Não se preocupe, clique no link abaixo e redefina sua senha:
          </p>
            <a href="${process.env.BASE_URL_FRONTEND}/reset/${token}" target="_blank">Redefinir Senha</a>
          <p>
            Caso não tenha feito a solicitação, ignore este e-mail.
          </p>
          <p>
            <strong>by happy</strong>
          </p>
        `
      }

      const envMail = await shippingEmail.sendMail(receivingEmail);
    }
    
    return response.status(200).json(user);
  }
}