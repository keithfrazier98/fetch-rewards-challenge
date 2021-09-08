
exports.up = function(knex) {
  return knex.schema.createTable("points", (table) => {
      table.string("payer")
      table.integer("points")
      table.timestamp("timestamp")
      //table.boolean("spent").notNullable().defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("points")
};
