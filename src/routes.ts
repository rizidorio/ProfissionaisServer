import express from 'express';

import ProfissionalController from './controllers/ProfissionalController';

const routes = express.Router();
const profissionalController = new ProfissionalController();

routes.get('/profissionais', profissionalController.index);

export default routes;
