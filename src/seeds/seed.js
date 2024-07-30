exports.seed = async function(knex) {
    await knex('comments').del();
    await knex('answers').del();
    await knex('questions').del();
    await knex('users').del();
  
    await knex('users').insert([
      { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123', role: 'student' },
      { id: 2, name: 'Teacher User', email: 'teacher@example.com', password: 'password123', role: 'teacher' }
    ]);
  
    await knex('questions').insert([
      { id: 1, content: 'What is Docker?', user_id: 1 }
    ]);
  
    await knex('answers').insert([
      { id: 1, content: 'Docker is a platform for developing, shipping, and running applications.', question_id: 1, user_id: 1, correct: false }
    ]);
  
    await knex('comments').insert([
      { id: 1, content: 'This is a comment.', answer_id: 1, user_id: 1 }
    ]);
  };
  