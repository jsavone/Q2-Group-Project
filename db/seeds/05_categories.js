
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {cat_name: 'breakfast'},
        {cat_name: 'lunch'},
        {cat_name: 'dinner'}
        
      ]);
    });
};
