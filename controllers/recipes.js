const knex = require("../db/knex.js");
// const AWS = require('aws-sdk');
// AWS.config.loadFromPath('./config.json');
// var s3Bucket = new AWS.S3({params: {Bucket: "q2-group-project1"}});
// const baseAWSURL = "https://s3-us-west-2.amazonaws.com/q2-group-project1/"

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  view: (req, res) => {
    req.session.enable_edit = false;
    knex('recipes').join('users', 'users.id', 'recipes.user_id').select('recipes.*', 'users.name', 'users.id as users_id', 'users.img_url as user_image').where('recipes.id', req.params.id).then((recipe) => {
      knex('comments').join('users', 'users.id', 'comments.user_id').where('comments.recipe_id', req.params.id).select('comments.*', 'users.name as user_name', 'users.img_url as user_image').then((comments) => {
        if (req.session.admin == true) {
          req.session.enable_edit = true;
        }
        if (req.session.user_id == recipe[0].user_id) {
          req.session.enable_edit = true;
        }
        if (req.session.user_id) {
            res.render('user-recipe', {recipe:recipe[0], comments: comments,
             session_user:req.session.user_id, enable_edit: req.session.enable_edit})
          }else{
            res.render('user-recipe', {recipe:recipe[0], comments: comments, session_user: null, enable_edit: null});
          }
      })
    })
  },
  create_recipe: function(req, res){
    res.render('create-recipe');
  },

  add_recipe: function(req, res){
    // let uploadData = {
    //   Key: req.body.recipe_name,
    //   Body: req.files.upload.data,
    //   ContentType: req.files.upload.mimetype,
    //   ACL: 'public-read'
    // }
    // s3Bucket.putObject(uploadData, function(err, data){
    //   if(err){
    //     console.log(err);
    //     return;
    //   }
    knex('recipes').insert({
      recipe_name: req.body.recipe_name,
      recipe_image: req.body.recipe_url,
      // recipe_image: baseAWSURL + uploadData.Key,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      prep_time: req.body.prep_time,
      cook_time: req.body.cook_time,
      user_id: req.session.user_id
    }).then(()=> {
      res.redirect('/profile') //We will need to change this to redirect to user profile
    })
  // })
  },

  upvote: (req, res) => {
    knex('votes').where('recipe_id', req.params.id).where('user_id', req.session.user_id).then((vote) => {
      if(vote.length>=1 && vote[0].vote=='up') {
        res.redirect('/recipe/'+req.params.id)
        return
      }else if (vote.length>=1 && vote[0].vote=='down'){
        knex('votes').where('recipe_id', req.params.id).where('user_id', req.session.user_id).update({vote:'up'}).then(() => {
          knex('recipes').where('id', req.params.id).increment('total_votes').then(() => {
            res.redirect('/recipe/'+req.params.id)
          })
        })
      }else{
        knex('votes').insert({
          recipe_id: req.params.id,
          user_id: req.session.user_id,
          vote: 'up'
        }).then(() => {
          knex('recipes').where('id', req.params.id).increment('total_votes').then(() => {
            res.redirect('/recipe/'+req.params.id)
          })
        })
      }
    })

  },

  downvote: (req, res) => {
    knex('votes').where('recipe_id', req.params.id).where('user_id', req.session.user_id).then((vote) => {
      if(vote.length>=1 && vote[0].vote=='down') {
        res.redirect('/recipe/'+req.params.id)
        return
      }else if (vote.length>=1 && vote[0].vote=='up'){
        knex('votes').where('recipe_id', req.params.id).where('user_id', req.session.user_id).update({vote:'down'}).then(() => {
          knex('recipes').where('id', req.params.id).decrement('total_votes').then(() => {
            res.redirect('/recipe/'+req.params.id)
          })
        })
      }else{
        knex('votes').insert({
          recipe_id: req.params.id,
          user_id: req.session.user_id,
          vote: 'down'
        }).then(() => {
          knex('recipes').where('id', req.params.id).decrement('total_votes').then(() => {
            res.redirect('/recipe/'+req.params.id)
          })
        })
      }
    })
  },

  save: (req, res) => {
    knex('saved_recipes').insert({
      user_id: req.session.user_id,
      recipe_id: req.params.id
    }).then(() => {
      res.redirect('/recipe/'+req.params.id);
    })
  },

  delete: (req, res) => {
    knex('recipes').where('id', req.params.id).del().then(() => {
      res.redirect('/') //NEED TO CHANGE THIS TO PROFILE
    })
  },

recipeEdit: function(req, res) {
    knex("users").where("id", req.session.user_id)
      .then(() => {
        knex("recipes").where("id", req.params.id)
          .then((data) => {
            res.render("edit_recipe", {
              recipe: data[0]
            });
          })
      })
  },


  recipeUpdate: function(req, res) {
    knex('recipes').where("id", req.params.id)
      .update({
        recipe_name: req.body.recipe_name,
      recipe_image: req.body.recipe_image,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        prep_time: req.body.prep_time,
        cook_time: req.body.cook_time,

      })
      .then(() => {
        res.redirect('/recipe/'+req.params.id);
      })
  },
}
