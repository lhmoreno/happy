import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

export default {
  async index(request: Request, response: Response) {
    // Busca todos os orfanatos confirmados
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where: { pending: false }
    });

    if (orphanages.length === 0) return response.status(404).send();

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    // Busca apenas um orfanato confirmado por id
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);


    const orphanage = await orphanagesRepository.findOne({
      relations: ['images'],
      where: { id, pending: false }
    });

    if (!orphanage) return response.status(404).send();

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    // Adm aprova o orfanato
  }
}