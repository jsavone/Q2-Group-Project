
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {comment:"this food was superrrr good", user_id:1, recipe_id:1},
        {comment:"tasty dish", user_id:2, recipe_id:2},
        {comment:"yum yum yum", user_id:3, recipe_id:3},
        {comment:"The best lasagna I've ever had!", user_id:3, recipe_id:4},
        {comment:"This pizza brought me to flavor town!", user_id:4, recipe_id:1}

      ]);
    });
};
