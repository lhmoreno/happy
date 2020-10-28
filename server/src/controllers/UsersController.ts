import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import { decode } from 'jsonwebtoken';

import User from '../models/User';

declare const process: {
  env: {
    FORGOT_PASSWORD: string;
  }
}

export default {

  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data = {
      email,
      password: hash
    }
    
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });
    
    await schema.validate(data, {
      abortEarly: false
    });

    const usersRepository = getRepository(User);
    
    const user = usersRepository.create(data);

    await usersRepository.save(user);
    
    return response.status(201).send();
  },

  async update(request: Request, response: Response) {
    const { token, newPassword } = request.body;
    const { id } = decode(token) as { id: number };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const usersRepository = getRepository(User);

    await usersRepository.update(id, { password: hash });

    return response.status(200).send();
  }
}