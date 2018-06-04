
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'John', email: 'john@john.com',bio:'food and computer enthusiast',img_url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",password:'john'},
        {name: 'Nisha', email: 'nisha@nisha.com',bio:'showing off cooking skills to the world',img_url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",password:'nisha'},
        {name: 'David', email: 'david@david.com',bio:'definitely better at cooking than coding',img_url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",password:'david'},
        {name: 'admin', email: 'admin@admin.com',bio:'admin',img_url:"",password:'admin',admin:true}

      ]);
    });
};
