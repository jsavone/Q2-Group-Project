const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  view: (req, res) => {
    knex('recipes').join('users', 'users.id', 'recipes.user_id').select('recipes.*', 'users.name', 'users.id as users_id').where('recipes.id', req.params.id).then((recipe) => {
      knex('comments').join('users', 'users.id', 'comments.user_id').where('comments.recipe_id', req.params.id).select('comments.*', 'users.name as user_name').then((comments) => {
        // res.json(comments)
        if (req.session.user_id) {
            res.render('user-recipe', {recipe:recipe[0], comments: comments, session_user:req.session.user_id})
          }else{
            res.render('user-recipe', {recipe:recipe[0], comments: comments, session_user: null});
          }
      })
    })
  },
  create_recipe: function(req, res){
    res.render('create-recipe');
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
  }
}
