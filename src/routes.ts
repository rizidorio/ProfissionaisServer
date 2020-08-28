import express, { response, request } from 'express';
import { celebrate, Joi } from 'celebrate';

import ProfissionaisController from './controllers/ProfissionaisController';
import CategoriasController from './controllers/CategoriasController';

const routes = express.Router();

const profissionaisController = new ProfissionaisController();
const categoriasController = new CategoriasController();

routes.get('/profissionais', profissionaisController.index);
routes.get('/profissionais/:id', profissionaisController.exibirPorId);
routes.get('/categorias', categoriasController.index);

routes.post('/profissionais',
    celebrate({
        body: Joi.object().keys({
                nome: Joi.string().required(),
                cpf: Joi.string().required(),
                cep: Joi.string().required(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                uf: Joi.string().required().max(2),
                celular: Joi.string().required(),
                whatsapp: Joi.string().required(),
                email: Joi.string().required().email(),
                facebook: Joi.string(),
                categoria: Joi.number().required(),
                subcategorias: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    profissionaisController.create);

export default routes;