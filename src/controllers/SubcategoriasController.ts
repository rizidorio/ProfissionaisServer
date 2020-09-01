import { Request, Response } from 'express';

import db from '../database/connection';

export default class SubcategoriasController {
    async index(req: Request, res: Response) {
        try {
            const { categoria } = req.query;

            let subcategorias = [];

            if(!categoria){
                subcategorias = await db('subcategorias').select('*');
            }
            else {
                subcategorias = await db('subcategorias')
                    .where('categoria_id', Number(categoria))
                    .distinct();
            }
               
            const serializedSubcategorias = subcategorias.map(subcategoria => {
                return {
                    id: subcategoria.id,
                    nome: subcategoria.nome,
                    categoria_id: subcategoria.categoria_id
                };
            });
    
            return res.json(serializedSubcategorias);

        } catch (error) {
            console.error(error);
        }
    }
}