const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  render: function(req, res) {
    res.render("newusers");
  },
  register:function(req,res){
    knex("users").insert({
      name:req.body.name,
      email:req.body.email,
      bio:req.body.bio,
      img_url:req.body.img_url,
      password:req.body.password
    }).then(()=>{
      res.redirect('/');
    })
  },
  login:function(req,res){
    knex('users').where("email", req.body.email).then((results)=>{
      let user=results[0];
      if(user.password===req.body.password){ //store the user id in session
        req.session.user_id=user.id;
        req.session.save(()=>{
          res.redirect("/receipes");
        })
      }else {
        res.redirect('/');
      }
      }).catch(()=>{
        res.redirect('/');
    })
}
}
