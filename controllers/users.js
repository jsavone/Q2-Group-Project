const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  newUsers: function(req, res) {
    res.render("register");
  },
  existingUsers: function(req,res){
res.render("login");
},

  index: function(req, res) {
    knex('recipes').join('users', 'users.id', 'recipes.user_id').select('recipes.*', 'users.name', 'users.id as users_id').orderBy('recipes.total_votes', 'desc').then((recipes) => {
      // res.json(recipes);
        res.render("index", {recipes:recipes});
    })

  },
  register:function(req,res){
    knex("users").insert({
      name:req.body.name,
      email:req.body.email,
      bio:req.body.bio,
      img_url:req.body.img_url,
      password:req.body.password
    }).then(()=>{
      res.redirect('/users/login');
    })
  },
  login:function(req,res){
    knex('users').where("email", req.body.email).then((results)=>{
      let user=results[0];
      if(user.password===req.body.password){ //store the user id in session
        req.session.user_id=user.id;
        req.session.save(()=>{
          res.redirect("/user-profile");
        })
      }else {
        res.redirect('/');
      }
      }).catch(()=>{
        res.redirect('/');
    })
},


  profile: function(req, res) {
    knex("users").where("id", req.session.user_id)
      .then((results) => {
        knex("recipes").where({
          user_id: req.session.user_id
          })
          .then((data) => {
            res.render("user-profile", {
              user: results[0],
              recipe: data
            });
          })
      })
  },
}
