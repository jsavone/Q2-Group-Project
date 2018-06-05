const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  view: function(req, res) {
    knex('recipes').join('users', 'users.id', 'recipes.user_id').select('recipes.*', 'users.name', 'users.id as users_id').where('recipes.id', req.params.id).then((recipe) => {
      // res.json(recipe[0])
      res.render('user-recipe', {recipe:recipe[0]});
    })

  },
  create_recipe: function(req, res){
    res.render('create-recipe');
  }
}
