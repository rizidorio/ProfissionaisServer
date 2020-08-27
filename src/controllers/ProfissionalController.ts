import { Response, Request } from 'express';

import db from '../database/connection';


export default class ProfissionalController {
    async index(res: Response, req: Request) {

        const { cidade, categoria, subcategorias } = req.query;
        
        const parsedSubcategorias = String(subcategorias).split(',').map(sub => Number(sub.trim()));

        const profissionais = await db('profissionais')
                                    .join('prof_cat_subcat', 'profissionais.id', '=', 'prof_cat_subcat.profissinoal_id')
                                    .whereIn('prof_cat_subcat.subcateria_id', parsedSubcategorias)
                                    .where('categoria', String(categoria))
                                    .where('cidade', String(cidade))
                                    .distinct()
                                    .select('profissionais.*');
        
        return res.json(profissionais);
    }

    async create(res: Response, req: Request) {
        console.log(req.body);
        const {
            nome,
            cpf,
            cep,
            bairro,
            cidade,
            uf,
            celular,
            whatsapp,
            email,
            facebook,
            categoria,
            subcategorias
        } = req.body;



        const trx = await db.transaction();

        const profissional = {
            nome,
            cpf,
            cep,
            bairro,
            cidade,
            uf,
            celular,
            whatsapp,
            email,
            facebook,
            categoria
        };

        const idsInseridos = await trx('profissionais').insert(profissional);

        const profissional_id = idsInseridos[0];

        const subcats = subcategorias.split(',')
                                     .map((sub: string) => Number(sub.trim()))
                                     .map((subcategoria_id: number) => {
                                        return {
                                            subcategoria_id,
                                            profissional_id
                                        };
                                     });
        await trx('prof_cat_subcat').insert(subcats);

        trx.commit();

        return res.json({
            id: profissional_id,
            ...profissional
        });
    }
}
