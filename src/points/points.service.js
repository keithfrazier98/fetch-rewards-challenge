const knex = require("../db/connection");

function create(data) {
  return knex("points").insert(data).returning(["payer", "points"]);
}

async function read() {
  const { min } = await knex("points").min("timestamp").where('points','!=',0).first();
  return knex("points").where("timestamp", min).first();
}

function get(){
    return knex("points").select("*")
}

function update(timestamp, points) {
  return knex("points").where("timestamp", timestamp).update("points", points);
}
module.exports = {
  create,
  read,
  update,
  get
};
