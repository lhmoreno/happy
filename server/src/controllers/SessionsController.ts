import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import User from '../models/User';

declare const process: {
    env: {
        PRIVATE_KEY: string;
    }
}

export default {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    if (!user) return response.status(401).send();

    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) return response.status(401).send();

    const { id } = user;

    const token = sign({ id }, process.env.PRIVATE_KEY, {
      expiresIn: 900 // Token esprina em 15 minutos
    });

    return response.status(200).json({ token });
  },

  async show(request: Request, response: Response, next: NextFunction) {
    const token = request.headers['x-access-token'];

    if (!token) return response.status(401).send();

    verify(token.toString(), process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) return response.status(401).send();
    });

    next();
  }
}