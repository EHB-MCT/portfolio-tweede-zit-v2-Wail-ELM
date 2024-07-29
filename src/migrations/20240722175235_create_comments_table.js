exports.up = function(knex) {
    return knex.schema.createTable('comments', function(table) {
      table.increments('id').primary();
      table.string('content').notNullable();
      table.integer('answer_id').unsigned().references('id').inTable('answers');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments');
  };
  