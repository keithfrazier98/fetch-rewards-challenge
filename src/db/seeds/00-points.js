
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('points').del()
    /*.then(function () {
      // Inserts seed entries
      return knex('points').insert([
        { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
      ]);
    });*/
};
