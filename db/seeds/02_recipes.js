
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {recipe_name: "Pizza", recipe_image:"https://www.seriouseats.com/recipes/images/2017/02/20170216-detroit-style-pizza-43-1500x1125.jpg",total_votes:10,ingredients:"pepperoni and cheese",directions:"roll dough, bake 400 degrees",prep_time:"15 minutes",cook_time:"30 minutes",user_id:1},
        {recipe_name: "Tacos", recipe_image:"https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_80,w_auto:100:1280/v1/hellofresh_s3/image/pineapple-poblano-beef-tacos-b7badad1.jpg",total_votes:20,ingredients:"cilantro and beef",directions:"roll beef in tortilla",prep_time:"5 minutes",cook_time:"15 minutes",user_id:2},
        {recipe_name: "Guacamole", recipe_image:"https://www.simplyrecipes.com/wp-content/uploads/2014/05/guacamole-horiz-a-1600.jpg",total_votes:7,ingredients:"avocados,garlic, and lemons",directions:"crush avacados in bowl",prep_time:"25 minutes",cook_time:"5 minutes",user_id:3},
        {recipe_name: "Lasagna", recipe_image:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/13/5/FNM_120112-Anne-Burrell-Sausage-Lasanga-Recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382375902581.jpeg",total_votes:3,ingredients:"Pasta, meat, sauce.",directions:"Layer gently into an oven safe baking dish.",prep_time:"1 hour",cook_time:"45 minutes",user_id:4}

      ]);
    });
};
