
exports.up = function(knex) {
  return knex.schema.createTable('Posts', (table) => {
    table.uuid('id').primary().notNullable();
    table.string('title', 255).notNullable();
    table.string('lead', 255).notNullable();
    table.text('content').notNullable();
    table.timestamps(false,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Posts')
};
