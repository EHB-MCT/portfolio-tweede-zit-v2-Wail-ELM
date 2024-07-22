
exports.up = function(knex) {
    return knex.schema
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('role').notNullable(); // student or teacher
        table.timestamps(true, true);
      })
      .createTable('questions', function(table) {
        table.increments('id').primary();
        table.string('content').notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.timestamps(true, true);
      })
      .createTable('answers', function(table) {
        table.increments('id').primary();
        table.string('content').notNullable();
        table.integer('question_id').unsigned().references('id').inTable('questions');
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('answers')
      .dropTableIfExists('questions')
      .dropTableIfExists('users');
  };
  