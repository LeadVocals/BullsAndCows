//models/Game.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gameSchema = new Schema({
  username: String,
  gen_number: Number,
  total_time: Number,
  tries: Number,
  tour_id: String,
  success: Boolean
});
module.exports = mongoose.model('Game', gameSchema);