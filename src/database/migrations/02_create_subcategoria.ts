import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('subcategorias', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();

        table.integer('categoria_id')
             .notNullable()
             .references('id')
             .inTable('categorias');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('subcategorias');
}