
exports.up = function(knex) {
  return knex.schema.createTable("points", (table) => {
      table.string("payer").primary()
      table.integer("points")
      table.timestamp("timestamp")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("points")
};
