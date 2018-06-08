
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('saved_recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('saved_recipes').insert([
        {user_id:1,recipe_id:1},
        {user_id:1,recipe_id:4},
        {user_id:1,recipe_id:2},
        {user_id:2,recipe_id:2},
        {user_id:2,recipe_id:4},
        {user_id:3,recipe_id:3},
        {user_id:3,recipe_id:1},
        {user_id:4,recipe_id:1},
        {user_id:4,recipe_id:2}

      ]);
    });
};
