import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_admin_view';

import Orphanage from '../models/Orphanage';

export default {
  async index(request: Request, response: Response) {
    // Mostra todos os orfanatos pendentes para o adm
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where: { pending: true }
    });

    if (orphanages.length === 0) return response.json([]);

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    // Busca apenas um orfanato pendente por id para o adm
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);


    const orphanage = await orphanagesRepository.findOne({
      relations: ['images'],
      where: { id, pending: true }
    });

    if (!orphanage) return response.status(404).send();

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    // Qualquer pessoa cria um orfanato
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);
  
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path : image.filename }
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      whatsapp,
      open_on_weekends: open_on_weekends === 'true' ? true : false,
      images,
      pending: true
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      pending: Yup.boolean().required(),
      whatsapp: Yup.string().length(13),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);
  
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(data);
  },

  async update(request: Request, response: Response) {
    // ADM CONFIRMA O ORFANATO
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne({
      where: { id, pending: true }
    });

    if (!orphanage) return response.status(404).send();

    await orphanagesRepository.update(orphanage.id, { pending: false });

    return response.status(200).send();
  },

  async destroy(request: Request, response: Response) {
    // ADM RECUSA O ORFANATO
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne({
      where: { id, pending: true }
    });

    if (!orphanage) return response.status(404).send();

    await orphanagesRepository.delete(id);

    return response.status(200).send();
  }
}