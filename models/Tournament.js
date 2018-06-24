//models/Tournament.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tournamentSchema = new Schema({
  name: String,
  game_type: String,
  start_date: Date,
  end_date: Date
});
module.exports = mongoose.model('Tournament', tournamentSchema);