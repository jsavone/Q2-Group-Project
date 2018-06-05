
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {recipe_name: "pizza", recipe_image:"https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png",total_votes:10,ingredients:"pepperoni and cheese",directions:"roll dough, bake 400 degrees",prep_time:"15 minutes",cook_time:"30 minutes",user_id:1},
        {recipe_name: "tacos", recipe_image:"https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png",total_votes:20,ingredients:"cilantro and beef",directions:"roll beef in tortilla",prep_time:"5 minutes",cook_time:"15 minutes",user_id:2},
        {recipe_name: "guacamole", recipe_image:"https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png",total_votes:5,ingredients:"avocados,garlic, and lemons",directions:"crush avacados in bowl",prep_time:"25 minutes",cook_time:"5 minutes",user_id:3}

      ]);
    });
};
