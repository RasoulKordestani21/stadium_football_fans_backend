
const mongoose = require("mongoose");
const personSchema = mongoose.Schema({
    name: String,
    favoriteTeams: Array,
    id: String
  });
  const PersonModel = mongoose.model("person", personSchema);

  module.exports = PersonModel
  