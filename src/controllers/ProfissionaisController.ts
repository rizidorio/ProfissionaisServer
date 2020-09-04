import { Request, Response } from 'express';

import db from '../database/connection';

export default class ProfissionaisController {
    async index(req: Request, res: Response) {
        try {
            const { cidade, categoria, subcategoria } = req.query;

            const parsedSubcategorias = String(subcategoria).split(',').map(subcategoria => Number(subcategoria.trim()));

            if(!cidade || !categoria){
                return res.status(400).json({
                    error: 'Selecione uma cidade e categoria para continuar.',
                });
            }
            let profissionais = [];

            if(!subcategoria){
                profissionais = await db('profissionais')
                .join('prof_cat_subcat', 'profissionais.id', '=', 'prof_cat_subcat.profissional_id')
                .where('prof_cat_subcat.categoria_id', Number(categoria))
                .where('cidade', String(cidade))
                .distinct()
                .select('profissionais.*');
                
            } else {
               profissionais = await db('profissionais')
                .join('prof_cat_subcat', 'profissionais.id', '=', 'prof_cat_subcat.profissional_id')
                .whereIn('prof_cat_subcat.subcategoria_id', parsedSubcategorias)
                .where('prof_cat_subcat.categoria_id', Number(categoria))
                .where('cidade', String(cidade))
                .distinct()
                .select('profissionais.*');
            }
            
            const serializedProfissionais = profissionais.map(profissional => {
                return {
                    ...profissional
                };
            });

            return res.json(serializedProfissionais);
            
        } catch (error) {
            console.log(error);
        }
    }

    async exibirPorId(req: Request, res: Response) {
        const { id } = req.params;

        const profissional = await db('profissionais').where('id', id).first();

        if(!profissional)
            return res.status(400).json({mensagem: 'Profissional não encontrado.'})

        const serializedProfissional = {
            ...profissional
        };

        const categoria = await db('categorias')
            .join('prof_cat_subcat', 'categorias.id', '=', 'prof_cat_subcat.categoria_id')
            .where('prof_cat_subcat.profissional_id', id)
            .select('categorias.nome').first();
        
        const subcategorias = await db('subcategorias')
            .join('prof_cat_subcat', 'subcategorias.id', '=', 'prof_cat_subcat.subcategoria_id')
            .where('prof_cat_subcat.profissional_id', id)
            .select('subcategorias.nome');

        return res.json({
            serializedProfissional,
            categoria,
            subcategorias
        });
    }

    async create(req: Request, res: Response){
        try {
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
            } = req.body
    
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
            };
    
            const idsCadastrado = await trx('profissionais').insert(profissional);
    
            const profissional_id = idsCadastrado[0];
            
            const categoria_id = Number(categoria);

            const prof_cat_subcat = subcategorias
                .split(',')
                .map((subcategoria: string) => Number(subcategoria.trim()))
                .map((subcategoria_id: number) => {
                    return {
                        profissional_id,
                        categoria_id,
                        subcategoria_id
                    }
                });

            await trx('prof_cat_subcat').insert(prof_cat_subcat);

            trx.commit();
    
            return res.json({
                id: profissional_id,
                ...profissional
            });
        } catch (error) {
            console.error(error);
        }
    }
}