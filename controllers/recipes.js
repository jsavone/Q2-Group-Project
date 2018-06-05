const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  view: (req, res) => {
    req.session.enable_edit = false;
    knex('recipes').join('users', 'users.id', 'recipes.user_id').select('recipes.*', 'users.name', 'users.id as users_id').where('recipes.id', req.params.id).then((recipe) => {
      knex('comments').join('users', 'users.id', 'comments.user_id').where('comments.recipe_id', req.params.id).select('comments.*', 'users.name as user_name').then((comments) => {
        if (req.session.user_id == recipe[0].user_id) {
          req.session.enable_edit = true;
        }
        if (req.session.user_id) {
            res.render('user-recipe', {recipe:recipe[0], comments: comments, session_user:req.session.user_id, enable_edit: req.session.enable_edit})
          }else{
            res.render('user-recipe', {recipe:recipe[0], comments: comments, session_user: null});
          }
      })
    })
  },
  create_recipe: function(req, res){
    res.render('create-recipe');
  },

  add_recipe: function(req, res){
    knex('recipes').insert({
      recipe_name: req.body.recipe_name,
      recipe_image: req.body.recipe_image,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      prep_time: req.body.prep_time,
      cook_time: req.body.cook_time,
      user_id: req.session.user_id
    }).then(()=> {
      res.redirect('/') //We will need to change this to redirect to user profile
    })
  },

  upvote: (req, res) => {
    knex('recipes').where('id', req.params.id).increment('total_votes').then(() => {
      res.redirect('/recipe/'+req.params.id)
    })
  },

  downvote: (req, res) => {
    knex('recipes').where('id', req.params.id).decrement('total_votes').then(() => {
      res.redirect('/recipe/'+req.params.id)
    })
  },

  delete: (req, res) => {
    knex('recipes').where('id', req.params.id).del().then(() => {
      res.redirect('/') //NEED TO CHANGE THIS TO PROFILE
    })
  }
}
