import { Request, Response } from 'express';

import db from '../database/connection';

export default class ProfissionaisController {
    async index(request: Request, response: Response) {
        const { cidade, categoria, subcategorias } = request.query;

        const parsedSubcategorias = String(subcategorias).split(',').map(subcategoria => Number(subcategoria.trim()));

        const profissionais = await db('profissionais')
            .join('prof_cat_subcat', 'profissionais.id', '=', 'prof_cat_subcat.profissional_id')
            .whereIn('prof_cat_subcat.subcategoria_id', parsedSubcategorias)
            .where('cidade', String(cidade))
            .distinct()
            .select('profissionais.*');
    }
}