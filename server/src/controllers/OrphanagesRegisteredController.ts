import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';
import Image from '../models/Image';

interface EditOrphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  whatsapp: string;
  delete_images: string;
}

export default {
  async index(request: Request, response: Response) {
    // Busca todos os orfanatos confirmados
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where: { pending: false }
    });

    if (orphanages.length === 0) return response.json([]);

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

  async update(request: Request, response: Response) {
    // Adm edita o orfanato
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
      delete_images
    }: EditOrphanage = request.body;

    const { id } = request.params;

    // DELETE IMAGENS SE PRECISAR
    const imagesRepository = getRepository(Image);
    if (delete_images !== '' && delete_images) {
      const deleteImages = delete_images.split(',');
      
      deleteImages.forEach(async (id) => {
        await imagesRepository.delete(id)
      });
    }
  
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
      open_on_weekends: open_on_weekends === 'true' ? true : false
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      whatsapp: Yup.string().length(13),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    // ATUALIZA O ORFATANATO
    await orphanagesRepository.update(id, data);

    // SALVA IMAGENS NOVAS
    if (images[0]) {
      const orphanage = await orphanagesRepository.findOne(id);

      images.forEach(async ({ path }) => {
        const imagesOrphanage = imagesRepository.create({ path, orphanage });
        await imagesRepository.save(imagesOrphanage);
      })
    }

    return response.status(201).json(data);
  },

  async destroy(request: Request, response: Response) {
    // ADM DELETE UM ORFANATO
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne({
      where: { id }
    });

    if (!orphanage) return response.status(404).send();

    await orphanagesRepository.delete(orphanage.id);

    return response.status(200).send();
  }
}