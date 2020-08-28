import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('prof_cat_subcat', (table) => {

        table.increments('id').primary();

        table.integer('profissional_id')
             .notNullable()
             .references('id')
             .inTable('profissionais');

        table.integer('categoria_id')
             .notNullable()
             .references('id')
             .inTable('categorias');
        
        table.integer('subcategoria_id')
             .notNullable()
             .references('id')
             .inTable('subcategorias');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('prof_cat_subcat');
}