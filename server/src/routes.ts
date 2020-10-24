import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesPendingController from './controllers/OrphanagesPendingController';
import OrphanagesRegisteredController from './controllers/OrphanagesRegisteredController';

import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

const routes = Router();
const upload = multer(uploadConfig);

// ROTAS ABERTAS
routes.get('/orphanages', OrphanagesRegisteredController.index); // Busca todos os orfanatos cadastrados
routes.get('/orphanage/:id', OrphanagesRegisteredController.show); // Busca apenas um orfanato cadastrado por id
routes.post('/create/orphanage', upload.array('images'), OrphanagesPendingController.create); // Cria um orfanato para ser aprovado pelo adm
routes.post('/login', SessionsController.create); // Loga um adm

// ROTAS RESTRITAS
routes.get('/orphanages/pending', SessionsController.show, OrphanagesPendingController.index); // Mostra todos os orfanatos pendentes para o adm
routes.put('/confirm/orphanage/:id', SessionsController.show, OrphanagesPendingController.update); // Adm confirma a criação do orfanato
routes.delete('/cancel/orphanage/:id', SessionsController.show, OrphanagesPendingController.destroy); // Adm recusa a criação do orfanato
routes.put('/edit/orphanage/:id', SessionsController.show, upload.array('images'), OrphanagesRegisteredController.update); // Adm edita o orfanato
routes.delete('/delete/orphanage/:id', SessionsController.show, OrphanagesRegisteredController.destroy); // Adm deleta orfanato

// ROTAS ESCONDIDAS
routes.post('/create/user', UsersController.create); // Cria um adm

export default routes;