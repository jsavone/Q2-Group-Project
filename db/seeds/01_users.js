
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'John', email: 'john@john.com',bio:'food and computer enthusiast',img_url:"http://www.cooking-culinary-arts-schools.org/wp-content/uploads/2013/01/Chef-holding-chicken-entree-TS.jpg",password:'john'},
        {name: 'Nisha', email: 'nisha@nisha.com',bio:'showing off cooking skills to the world',img_url:"https://img.freepik.com/free-photo/cook-works-with-vegetables-at-kitchen_1398-370.jpg?size=338&ext=jpg",password:'nisha'},
        {name: 'David', email: 'david@david.com',bio:'definitely better at cooking than coding',img_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTejhJpoEuV4HcwzTbvR1Qr9McUmlfSxUZVrmjJsD6FrNW6jiKokA",password:'david'},
        {name: 'admin', email: 'admin@admin.com',bio:'admin',img_url:"",password:'admin',admin:true}
]);
    });

};
