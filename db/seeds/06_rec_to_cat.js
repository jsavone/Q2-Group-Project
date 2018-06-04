
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rec_to_cat').del()
    .then(function () {
      // Inserts seed entries
      return knex('rec_to_cat').insert([
        {recipe_id:1,category_id:3},
        {recipe_id:2,category_id:2},
        {recipe_id:3,category_id:1}
       
      ]);
    });
};
