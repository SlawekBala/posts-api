
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Posts')
  .del()
    .then(function () {
      // Inserts seed entries
      return knex('Posts').insert([
        {id: 1, title: 'Jakiś tytuł', lead: 'Tu chyba ma być user który wprowadzil', content: 'jakiś post usera'},
        {id: 2, title: 'Jakiś tytuł', lead: 'Tu chyba ma być user który wprowadzil', content: 'jakiś post usera'},
        {id: 3, title: 'Jakiś tytuł', lead: 'Tu chyba ma być user który wprowadzil', content: 'jakiś post usera'},
        {id: 4, title: 'Jakiś tytuł', lead: 'Tu chyba ma być user który wprowadzil', content: 'jakiś post usera'},
        {id: 5, title: 'Jakiś tytuł', lead: 'Tu chyba ma być user który wprowadzil', content: 'jakiś post usera'},
        {id: 6, title: 'Jakiś tytuł', lead: 'Tu chyba ma być user który wprowadzil', content: 'jakiś post usera'},
        {id: 7, title: 'Jakiś tytuł', lead: 'Tu chyba ma być user który wprowadzil', content: 'jakiś post usera'},
      ]);
    });
};
