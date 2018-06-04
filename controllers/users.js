const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  render: function(req, res) {
    res.render("newusers");
  },

  index: function(req, res) {
    knex('recipes').join('users', 'users.id', 'recipes.user_id').select('recipes.*', 'users.name', 'users.id as users_id').then((recipes) => {
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
          res.redirect("/recipes");
        })
      }else {
        res.redirect('/');
      }
      }).catch(()=>{
        res.redirect('/');
    })
}
}
