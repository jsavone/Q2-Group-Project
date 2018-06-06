const knex = require("../db/knex.js");
// const AWS = require('aws-sdk');
// AWS.config.loadFromPath('./config.json');
// var s3Bucket = new AWS.S3({params: {Bucket: "q2-group-project-1"}});
// const baseAWSURL = "https://s3-us-west-2.amazonaws.com/q2-group-project-1/"
const hasher = require("../config/hasher");


module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  newUsers: function(req, res) {
    res.render("register");
  },
  existingUsers: function(req,res){
    if(!req.session.errors){
      req.session.errors = null;
    }
    res.render("login", {errors: req.session.errors});
    },

  index: function(req, res) {
    knex('recipes').join('users', 'users.id', 'recipes.user_id').select('recipes.*', 'users.name', 'users.id as users_id').orderBy('recipes.total_votes', 'desc').then((recipes) => {
      knex('categories').then((categories) => {
        res.render("index", {recipes:recipes, categories:categories, user: req.session.user_id || null});
      })
    })
  },

  categories: (req, res) => {
    knex('recipes').join('rec_to_cat', 'recipes.id', "rec_to_cat.recipe_id").join('categories', 'rec_to_cat.category_id', 'categories.id').join('users', 'users.id', 'recipes.user_id').where('categories.id', req.params.id).then((results) => {
        knex('categories').then((categories) => {
          res.render("index", {recipes:results, categories:categories});
      })
    })
  },

  register:function(req,res){

    req.session.errors = null

    // let uploadData = {
    //   Key: req.body.email,
    //   Body: req.files.upload.data,
    //   ContentType: req.files.upload.mimetype,
    //   ACL: 'public-read'
    // }
    // s3Bucket.putObject(uploadData, function(err, data){
    //   if(err){
    //     console.log(err);
    //     return;
    //   }
      hasher.hash(req.body).then((users) => {

    knex("users").insert({
      name:users.name,
      email:users.email,
      bio:users.bio,
      img_url: users.img_url,
      // img_url:baseAWSURL + uploadData.Key, // We know that they key will be the end of the url
      password:users.password
}).then(()=>{
      res.redirect('/users/login');
    }).catch(()=>{
      req.session.errors.push("Register was invalid");
    })
  })
// })

  },




  login:function(req,res){
    req.session.errors = null;
    req.session.admin = null;
    knex('users').where("email", req.body.email).then((results)=>{
      let user=results[0];
      hasher.check(user, req.body).then((isMatch) => {
        if (isMatch) {
          req.session.user_id = user.id;
          if (user.admin) {
            req.session.admin = true;
          }
          req.session.save(() => {
            res.redirect(`/profile`);
          })
        } else {
        req.session.errors = "Email or Password was invalid";
          req.session.save(()=>{
            res.redirect("/users/login");
          })
        }
      })
      }).catch(()=>{
            req.session.errors.push("Email or Password was invalid");
            req.session.save(()=>{
              res.redirect("/users/login");
      })
    })
  },

  profile: async function(req, res) {
    req.session.errors = null
    const users = await knex("users").where("id", req.session.user_id);
    const recipe = await knex("recipes").where({user_id: req.session.user_id});
    const saved_recipes = await knex("saved_recipes").where({user_id: req.session.user_id});
    const finalSavedRecipes = await Promise.all(saved_recipes.map(saved_recipe =>
                              knex("recipes").where({id: saved_recipe.recipe_id}).first()
                            )) ;
    // console.log('finalSavedRecipes ', finalSavedRecipes)
    res.render("user-profile", {
      user: users[0],
      recipe,
      saved_recipes: finalSavedRecipes,
    });
  },

  details: function(req, res) {
    knex("users").where("id", req.session.user_id)
      .then((results) => {
        knex("recipes").where({
          user_id: req.session.user_id,
          id: req.params.id
          })
          .then((data) => {
            res.render("recipe-details", {
              user: results[0],
              recipe: data[0]
            });
          })
      })
  },
  logout: function(req, res) {
    req.session.destroy();
    res.redirect("/");
  },


}
